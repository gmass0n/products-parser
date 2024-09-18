import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import {
  databaseConfig,
  parseDatabaseConfig,
} from './shared/configs/database.config';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [parseDatabaseConfig],
    }),
    DatabaseModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
    ProductsModule,
    ApiModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
