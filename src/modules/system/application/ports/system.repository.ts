import { SystemDatabaseConnectionStatusEnum } from '../../domain/enums/system-database-connection-status.enum';

export abstract class SystemRepository {
  abstract checkDatabaseConnection(): Promise<SystemDatabaseConnectionStatusEnum>;
}
