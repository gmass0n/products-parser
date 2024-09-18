import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { ProductsFacade } from '../products/products.facade';
import { cronConfig } from '~/shared/configs/cron.config';

@Injectable()
export class CronService {
  private importProductsCronIsRunning = false;

  constructor(private readonly productsFacade: ProductsFacade) {}

  @Cron(cronConfig.productsImport.time, cronConfig.productsImport)
  public async handleImportProducts(): Promise<void> {
    try {
      if (this.importProductsCronIsRunning) return;

      this.importProductsCronIsRunning = true;

      await this.productsFacade.importProducts();
    } finally {
      this.importProductsCronIsRunning = false;
    }
  }
}
