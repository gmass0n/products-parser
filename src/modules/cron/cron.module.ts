import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ProductsModule],
  providers: [CronService],
})
export class CronModule {}
