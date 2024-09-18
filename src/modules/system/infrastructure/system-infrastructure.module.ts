import { Module } from '@nestjs/common';

import { SystemMongooseModule } from './mongoose/system-mongoose.module';

@Module({
  imports: [SystemMongooseModule],
  providers: [],
  exports: [SystemMongooseModule],
})
export class SystemInfrastructureModule {}
