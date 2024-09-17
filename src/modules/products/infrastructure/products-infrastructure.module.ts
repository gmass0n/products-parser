import { Module } from '@nestjs/common';

import { ProductsMongooseModule } from './mongoose/products-mongoose.module';

@Module({
  imports: [ProductsMongooseModule],
  providers: [],
  exports: [ProductsMongooseModule],
})
export class ProductsInfrastructureModule {}
