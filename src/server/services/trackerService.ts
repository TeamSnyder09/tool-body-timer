import { ToolBody, ToolBodyRecord, User, AuditLog } from '../../types';
import { StorageService } from './storageService';
import { AuthService } from './authService';
import { v4 as uuidv4 } from 'uuid';

export class TrackerService {
  constructor(
    private storage: StorageService,
    private authService: AuthService
  ) {}

  private async logAudit(
    userId: string,
    action: string,
    resourceType: 'toolbody' | 'machine' | 'user' | 'organization',
    resourceId: string,
    details?: any
  ): Promise<void> {
    const log: AuditLog = {
      id: uuidv4(),
      userId,
      action,
      resourceType,
      resourceId,
      timestamp: new Date(),
      details
    };
    await this.storage.saveAuditLog(log);
  }

  async installToolBody(
    user: User,
    name: string,
    serialNumber: string,
    machineId: string,
    initialRunTimeMinutes: number,
    organizationId?: string
  ): Promise<ToolBodyRecord> {
    if (!this.authService.hasPermission(user, 'create')) {
      throw new Error('Insufficient permissions');
    }

    const toolBody: ToolBody = {
      id: uuidv4(),
      name,
      serialNumber,
      machineId,
      installDate: new Date(),
      initialRunTimeMinutes,
      installedBy: user.id,
      organizationId
    };

    const record: ToolBodyRecord = {
      toolBody,
      totalRunTimeMinutes: initialRunTimeMinutes,
      lastUpdated: new Date(),
      lastUpdatedBy: user.id,
      isActive: true
    };

    await this.storage.saveToolBody(record);
    await this.logAudit(user.id, 'install', 'toolbody', toolBody.id, { name, machineId });

    return record;
  }

  async updateRunTime(
    user: User,
    toolBodyId: string,
    currentRunTimeMinutes: number,
    organizationId?: string
  ): Promise<ToolBodyRecord> {
    if (!this.authService.hasPermission(user, 'update')) {
      throw new Error('Insufficient permissions');
    }

    const record = await this.storage.getToolBodyById(toolBodyId);
    if (!record) {
      throw new Error('Tool body not found');
    }

    if (organizationId && record.toolBody.organizationId !== organizationId) {
      throw new Error('Access denied');
    }

    record.totalRunTimeMinutes = currentRunTimeMinutes;
    record.lastUpdated = new Date();
    record.lastUpdatedBy = user.id;

    await this.storage.saveToolBody(record);
    await this.logAudit(user.id, 'update_runtime', 'toolbody', toolBodyId, { currentRunTimeMinutes });

    return record;
  }

  async removeToolBody(user: User, toolBodyId: string, organizationId?: string): Promise<void> {
    if (!this.authService.hasPermission(user, 'delete')) {
      throw new Error('Insufficient permissions');
    }

    const record = await this.storage.getToolBodyById(toolBodyId);
    if (!record) {
      throw new Error('Tool body not found');
    }

    if (organizationId && record.toolBody.organizationId !== organizationId) {
      throw new Error('Access denied');
    }

    record.isActive = false;
    record.lastUpdated = new Date();
    record.lastUpdatedBy = user.id;

    await this.storage.saveToolBody(record);
    await this.logAudit(user.id, 'remove', 'toolbody', toolBodyId);
  }

  async getToolBodies(user: User, organizationId?: string): Promise<ToolBodyRecord[]> {
    if (!this.authService.hasPermission(user, 'read')) {
      throw new Error('Insufficient permissions');
    }

    const records = await this.storage.getToolBodies(organizationId);
    return records.filter(r => r.isActive);
  }

  async getToolBodyStats(user: User, toolBodyId: string) {
    if (!this.authService.hasPermission(user, 'read')) {
      throw new Error('Insufficient permissions');
    }

    const record = await this.storage.getToolBodyById(toolBodyId);
    if (!record) {
      throw new Error('Tool body not found');
    }

    const now = new Date();
    const installDate = new Date(record.toolBody.installDate);
    const timeSinceInstallMs = now.getTime() - installDate.getTime();
    const timeSinceInstallMinutes = Math.floor(timeSinceInstallMs / (1000 * 60));
    const runTimeSinceInstall = record.totalRunTimeMinutes - record.toolBody.initialRunTimeMinutes;

    return {
      toolBodyId: record.toolBody.id,
      timeSinceInstallMinutes,
      totalRunTimeSinceInstall: runTimeSinceInstall,
      record
    };
  }

  async getAuditLogs(user: User): Promise<AuditLog[]> {
    if (user.role !== 'admin') {
      throw new Error('Admin access required');
    }
    return await this.storage.getAuditLogs();
  }
}
