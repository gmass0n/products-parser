import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { DOCS_ROUTE } from './modules/docs/docs.constants';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Redirect(DOCS_ROUTE)
  @Get('/')
  public async docs(): Promise<void> {
    return;
  }
}
