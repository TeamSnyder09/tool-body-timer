import * as fs from 'fs/promises';
import * as path from 'path';
import { ToolBodyRecord, User, Organization, UserSession, AuditLog } from '../../types';

export class StorageService {
  private dataDir: string;

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.dataDir, { recursive: true });
    
    const files = [
      'users.json',
      'tool-bodies.json',
      'organizations.json',
      'sessions.json',
      'audit-logs.json'
    ];

    for (const file of files) {
      const filePath = path.join(this.dataDir, file);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
      }
    }
  }

  private async readFile<T>(filename: string): Promise<T[]> {
    const filePath = path.join(this.dataDir, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeFile<T>(filename: string, data: T[]): Promise<void> {
    const filePath = path.join(this.dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.readFile<User>('users.json');
  }

  async saveUser(user: User): Promise<void> {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    await this.writeFile('users.json', users);
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find(u => u.username === username) || null;
  }

  // Tool Bodies
  async getToolBodies(organizationId?: string): Promise<ToolBodyRecord[]> {
    let records = await this.readFile<ToolBodyRecord>('tool-bodies.json');
    if (organizationId) {
      records = records.filter(r => r.toolBody.organizationId === organizationId);
    }
    return records;
  }

  async saveToolBody(record: ToolBodyRecord): Promise<void> {
    const records = await this.getToolBodies();
    const index = records.findIndex(r => r.toolBody.id === record.toolBody.id);
    if (index >= 0) {
      records[index] = record;
    } else {
      records.push(record);
    }
    await this.writeFile('tool-bodies.json', records);
  }

  async getToolBodyById(id: string): Promise<ToolBodyRecord | null> {
    const records = await this.getToolBodies();
    return records.find(r => r.toolBody.id === id) || null;
  }

  // Organizations
  async getOrganizations(): Promise<Organization[]> {
    return this.readFile<Organization>('organizations.json');
  }

  async saveOrganization(org: Organization): Promise<void> {
    const orgs = await this.getOrganizations();
    const index = orgs.findIndex(o => o.id === org.id);
    if (index >= 0) {
      orgs[index] = org;
    } else {
      orgs.push(org);
    }
    await this.writeFile('organizations.json', orgs);
  }

  // Sessions
  async getSessions(): Promise<UserSession[]> {
    return this.readFile<UserSession>('sessions.json');
  }

  async saveSession(session: UserSession): Promise<void> {
    const sessions = await this.getSessions();
    const index = sessions.findIndex(s => s.userId === session.userId);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    await this.writeFile('sessions.json', sessions);
  }

  async getSessionByToken(token: string): Promise<UserSession | null> {
    const sessions = await this.getSessions();
    return sessions.find(s => s.token === token) || null;
  }

  async deleteSession(userId: string): Promise<void> {
    const sessions = await this.getSessions();
    const filtered = sessions.filter(s => s.userId !== userId);
    await this.writeFile('sessions.json', filtered);
  }

  // Audit Logs
  async saveAuditLog(log: AuditLog): Promise<void> {
    const logs = await this.readFile<AuditLog>('audit-logs.json');
    logs.push(log);
    await this.writeFile('audit-logs.json', logs);
  }

  async getAuditLogs(userId?: string, resourceType?: string): Promise<AuditLog[]> {
    let logs = await this.readFile<AuditLog>('audit-logs.json');
    if (userId) {
      logs = logs.filter(l => l.userId === userId);
    }
    if (resourceType) {
      logs = logs.filter(l => l.resourceType === resourceType);
    }
    return logs;
  }
}
