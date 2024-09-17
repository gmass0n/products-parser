import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsModule } from '~/modules/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ProductsController],
})
export class ProductsApiModule {}
