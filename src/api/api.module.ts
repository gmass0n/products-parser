import { Module } from '@nestjs/common';
import { ProductsApiModule } from './products/products-api.module';

@Module({
  imports: [ProductsApiModule],
})
export class ApiModule {}
