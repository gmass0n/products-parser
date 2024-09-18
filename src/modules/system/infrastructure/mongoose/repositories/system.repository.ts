import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { SystemDatabaseConnectionStatusEnum } from '~/modules/system/domain/enums/system-database-connection-status.enum';
import { ISystemRepository } from '~/modules/system/domain/repositories/system.repository';

@Injectable()
export class SystemMongooseRepository implements ISystemRepository {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async checkDatabaseConnection(): Promise<SystemDatabaseConnectionStatusEnum> {
    try {
      if (this.connection.readyState !== 1) throw Error();
      return SystemDatabaseConnectionStatusEnum.success;
    } catch (err) {
      return SystemDatabaseConnectionStatusEnum.failure;
    }
  }
}
