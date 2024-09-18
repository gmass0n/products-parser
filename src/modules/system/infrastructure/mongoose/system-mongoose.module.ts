import { Module } from '@nestjs/common';

import { SystemMongooseRepository } from './repositories/system.repository';

@Module({
  imports: [],
  providers: [SystemMongooseRepository],
  exports: [SystemMongooseRepository],
})
export class SystemMongooseModule {}
