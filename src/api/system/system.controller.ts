import { Controller, Get } from '@nestjs/common';
import { SystemFacade } from '~/modules/system/system.facade';
import { SystemStatusResponseDTO } from './dtos/system-status-response.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/')
export class SystemController {
  constructor(private readonly systemFacade: SystemFacade) {}

  @ApiOkResponse({ type: SystemStatusResponseDTO })
  @ApiOperation({ summary: 'Detalhamento da API' })
  @Get('/')
  public async showStatus(): Promise<SystemStatusResponseDTO> {
    return this.systemFacade.getSystemStatus();
  }
}
