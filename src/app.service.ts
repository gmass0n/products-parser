import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getInfo(): Promise<any> {
    return {
      memory_usage: '',
      last_cron: '',
      database_status: '',
      runtime: '',
    };
  }
}
