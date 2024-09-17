import { Module } from '@nestjs/common';

import { ProductsFacade } from './products.facade';
import { ProductsApplicationModule } from './application/products-application.module';
import { ProductsInfrastructureModule } from './infrastructure/products-infrastructure.module';

@Module({
  imports: [
    ProductsApplicationModule.withInfrastructure([
      ProductsInfrastructureModule,
    ]),
  ],
  providers: [ProductsFacade],
  exports: [ProductsFacade],
})
export class ProductsModule {}
