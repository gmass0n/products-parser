import { Module } from '@nestjs/common';
import { ProductsApiModule } from './products/products-api.module';
import { SystemApiModule } from './system/system-api.module';

@Module({
  imports: [SystemApiModule, ProductsApiModule],
})
export class ApiModule {}
