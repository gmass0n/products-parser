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
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './shared/guards/api-key.guard';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
