import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(authService: AuthService) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ success: false, error: 'No token provided' });
      }

      const user = await authService.validateSession(token);
      
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid or expired token' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ success: false, error: 'Authentication failed' });
    }
  };
}
