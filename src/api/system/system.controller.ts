/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Headers } from '@nestjs/common';
import { SystemFacade } from '~/modules/system/system.facade';
import { SystemStatusResponseDTO } from './dtos/system-status-response.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BaseHeaders } from '~/shared/headers/base.headers';

@Controller('/')
export class SystemController {
  constructor(private readonly systemFacade: SystemFacade) {}

  @ApiOkResponse({ type: SystemStatusResponseDTO })
  @ApiOperation({ summary: 'Detalhamento da API' })
  @Get('/')
  public async showStatus(
    @Headers() _: BaseHeaders,
  ): Promise<SystemStatusResponseDTO> {
    return this.systemFacade.getSystemStatus();
  }
}
