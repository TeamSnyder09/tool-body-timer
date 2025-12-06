export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  createdAt: Date;
  lastLogin?: Date;
}

export interface ToolBody {
  id: string;
  name: string;
  serialNumber: string;
  machineId: string;
  installDate: Date;
  initialRunTimeMinutes: number;
  installedBy: string;
  organizationId?: string;
}

export interface ToolBodyRecord {
  toolBody: ToolBody;
  totalRunTimeMinutes: number;
  lastUpdated: Date;
  lastUpdatedBy: string;
  isActive: boolean;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: Date;
  adminUsers: string[];
}

export interface UserSession {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: 'toolbody' | 'machine' | 'user' | 'organization';
  resourceId: string;
  timestamp: Date;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Legacy interfaces
export interface Tool {
    id: string;
    name: string;
    installationDate: Date;
    usageTime: number;
}

export interface Machine {
    id: string;
    name: string;
    tools: Tool[];
}

export interface ToolUsageRecord {
    toolId: string;
    machineId: string;
    startTime: Date;
    endTime: Date;
    duration: number;
}
