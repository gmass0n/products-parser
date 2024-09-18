import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './shared/database/database.module';
import {
  databaseConfig,
  parseDatabaseConfig,
} from './shared/configs/database.config';
import { ApiModule } from './api/api.module';
import { CronModule } from './modules/cron/cron.module';
import { parseCronConfig } from './shared/configs/cron.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [parseDatabaseConfig, parseCronConfig],
    }),
    DatabaseModule.forRoot(databaseConfig),
    ApiModule,
    CronModule,
  ],
})
export class AppModule {}
