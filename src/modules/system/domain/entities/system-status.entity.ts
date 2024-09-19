import { SystemDatabaseConnectionStatusEnum } from '../enums/system-database-connection-status.enum';

export class SystemStatusEntity {
  public databaseConnectionStatus: SystemDatabaseConnectionStatusEnum;
  public lastCronExecution: Record<string, string>;
  public uptime: string;
  public memoryUsage: {
    rss: string;
    heapUsed: string;
    heapTotal: string;
  };

  constructor(
    databaseConnectionStatus: SystemDatabaseConnectionStatusEnum,
    lastCronExecution: Record<string, string>,
    uptime: number,
    memoryUsage: NodeJS.MemoryUsage,
  ) {
    this.databaseConnectionStatus = databaseConnectionStatus;
    this.lastCronExecution = lastCronExecution;
    this.uptime = this.formatUptime(uptime);
    this.memoryUsage = this.formatMemoryUsage(memoryUsage);
  }

  public formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${minutes}:${secs}`;
  }

  public formatMemoryUsage(
    memory: NodeJS.MemoryUsage,
  ): SystemStatusEntity['memoryUsage'] {
    return {
      rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
    };
  }
}
