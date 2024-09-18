import { Injectable } from '@nestjs/common';

import { SystemDatabaseConnectionStatusEnum } from '~/modules/system/domain/enums/system-database-connection-status.enum';
import { ISystemRepository } from '~/modules/system/domain/repositories/system.repository';

@Injectable()
export class SystemMongooseRepository implements ISystemRepository {
  constructor() {}

  public async checkDatabaseConnection(): Promise<SystemDatabaseConnectionStatusEnum> {
    try {
      return SystemDatabaseConnectionStatusEnum.success;
    } catch (err) {
      return SystemDatabaseConnectionStatusEnum.failure;
    }
  }

  public async getLastCronExecution(): Promise<string> {
    return new Date().toISOString();
  }
}
