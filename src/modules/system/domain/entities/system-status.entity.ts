import { SystemDatabaseConnectionStatusEnum } from '../enums/system-database-connection-status.enum';

export class SystemStatusEntity {
  constructor(
    public readonly databaseConnectionStatus: SystemDatabaseConnectionStatusEnum,
    public readonly lastCronExecution: Record<string, string>,
    public readonly uptime: string,
    public readonly memoryUsage: {
      rss: string;
      heapUsed: string;
      heapTotal: string;
    },
  ) {}
}
