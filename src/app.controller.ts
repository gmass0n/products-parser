import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Detalhamento da API' })
  @Get('/')
  public async getInfo(): Promise<void> {
    return this.appService.getInfo();
  }
}
