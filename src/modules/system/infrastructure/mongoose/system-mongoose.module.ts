import { Module } from '@nestjs/common';

import { SystemMongooseRepository } from './repositories/system.repository';
import { SystemRepository } from '../../application/ports/system.repository';

@Module({
  imports: [],
  providers: [
    SystemMongooseRepository,
    {
      provide: SystemRepository,
      useClass: SystemMongooseRepository,
    },
  ],
  exports: [SystemRepository],
})
export class SystemMongooseModule {}
