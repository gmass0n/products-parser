import { Module } from '@nestjs/common';

import { SystemFacade } from './system.facade';
import { SystemApplicationModule } from './application/system-application.module';
import { SystemInfrastructureModule } from './infrastructure/system-infrastructure.module';

@Module({
  imports: [
    SystemApplicationModule.withInfrastructure([SystemInfrastructureModule]),
  ],
  providers: [SystemFacade],
  exports: [SystemFacade],
})
export class SystemModule {}
