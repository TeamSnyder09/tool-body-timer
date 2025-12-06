import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { StorageService } from './services/storageService';
import { AuthService } from './services/authService';
import { TrackerService } from './services/trackerService';
import { authMiddleware, AuthRequest } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize services
const storage = new StorageService('./data');
const authService = new AuthService(storage);
const trackerService = new TrackerService(storage, authService);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Initialize storage
storage.initialize().catch(console.error);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await authService.register(username, email, role || 'operator');
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username } = req.body;
    const result = await authService.login(username);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/logout', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    await authService.logout(req.user.id);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Organization routes
app.post('/api/organizations', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const { name } = req.body;
    const org = await authService.createOrganization(name, req.user.id);
    res.json({ success: true, data: org });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Tool body routes
app.post('/api/toolbodies', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const { name, serialNumber, machineId, initialRunTimeMinutes, organizationId } = req.body;
    const record = await trackerService.installToolBody(
      req.user,
      name,
      serialNumber,
      machineId,
      initialRunTimeMinutes || 0,
      organizationId
    );
    res.json({ success: true, data: record });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/toolbodies', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const organizationId = req.query.organizationId as string;
    const records = await trackerService.getToolBodies(req.user, organizationId);
    res.json({ success: true, data: records });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/toolbodies/:id', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const stats = await trackerService.getToolBodyStats(req.user, req.params.id);
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.put('/api/toolbodies/:id', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const { currentRunTimeMinutes, organizationId } = req.body;
    const record = await trackerService.updateRunTime(
      req.user,
      req.params.id,
      currentRunTimeMinutes,
      organizationId
    );
    res.json({ success: true, data: record });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/toolbodies/:id', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const organizationId = req.query.organizationId as string;
    await trackerService.removeToolBody(req.user, req.params.id, organizationId);
    res.json({ success: true, message: 'Tool body removed' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Audit logs
app.get('/api/audit', authMiddleware(authService), async (req: AuthRequest, res) => {
  try {
    const logs = await trackerService.getAuditLogs(req.user);
    res.json({ success: true, data: logs });
  } catch (error: any) {
    res.status(403).json({ success: false, error: error.message });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
