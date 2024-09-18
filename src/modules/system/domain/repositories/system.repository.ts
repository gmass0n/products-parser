import { SystemDatabaseConnectionStatusEnum } from '../enums/system-database-connection-status.enum';

export interface ISystemRepository {
  checkDatabaseConnection(): Promise<SystemDatabaseConnectionStatusEnum>;
  getLastCronExecution(): Promise<string>;
}
