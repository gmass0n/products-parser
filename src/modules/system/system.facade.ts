import { Injectable } from '@nestjs/common';

import { GetSystemStatusUseCase } from './application/get-system-status/get-system-status.use-case';

@Injectable()
export class SystemFacade {
  constructor(
    private readonly getSystemStatusUseCase: GetSystemStatusUseCase,
  ) {}

  public async getSystemStatus() {
    return this.getSystemStatusUseCase.execute();
  }
}
