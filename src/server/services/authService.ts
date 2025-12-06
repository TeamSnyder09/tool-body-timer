import { User, UserSession, Organization } from '../../types';
import { StorageService } from './storageService';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

export class AuthService {
  constructor(private storage: StorageService) {}

  async register(
    username: string,
    email: string,
    role: 'admin' | 'operator' | 'viewer'
  ): Promise<User> {
    const existing = await this.storage.getUserByUsername(username);
    if (existing) {
      throw new Error('Username already exists');
    }

    const user: User = {
      id: uuidv4(),
      username,
      email,
      role,
      createdAt: new Date()
    };

    await this.storage.saveUser(user);
    return user;
  }

  async login(username: string): Promise<{ user: User; session: UserSession }> {
    const user = await this.storage.getUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    user.lastLogin = new Date();
    await this.storage.saveUser(user);

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const session: UserSession = {
      userId: user.id,
      token,
      expiresAt
    };

    await this.storage.saveSession(session);
    return { user, session };
  }

  async validateSession(token: string): Promise<User | null> {
    const session = await this.storage.getSessionByToken(token);
    if (!session || new Date() > session.expiresAt) {
      return null;
    }
    return await this.storage.getUserById(session.userId);
  }

  async logout(userId: string): Promise<void> {
    await this.storage.deleteSession(userId);
  }

  async createOrganization(name: string, adminUserId: string): Promise<Organization> {
    const org: Organization = {
      id: uuidv4(),
      name,
      createdAt: new Date(),
      adminUsers: [adminUserId]
    };

    await this.storage.saveOrganization(org);
    return org;
  }

  hasPermission(user: User, action: 'create' | 'read' | 'update' | 'delete'): boolean {
    const permissions = {
      admin: ['create', 'read', 'update', 'delete'],
      operator: ['create', 'read', 'update'],
      viewer: ['read']
    };
    return permissions[user.role].includes(action);
  }
}
