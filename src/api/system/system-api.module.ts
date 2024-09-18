import { Module } from '@nestjs/common';

import { SystemModule } from '~/modules/system/system.module';

import { SystemController } from './system.controller';

@Module({
  imports: [SystemModule],
  controllers: [SystemController],
})
export class SystemApiModule {}
