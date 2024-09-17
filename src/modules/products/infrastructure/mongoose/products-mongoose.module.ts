import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/shared/database/database.module';
import { ProductSchema } from './schemas/product.schema';
import { ProductsMongooseRepository } from './repositories/products.repository';

import { PRODUCT_MODEL } from './constants';

@Module({
  imports: [
    DatabaseModule.forFeature({
      name: PRODUCT_MODEL,
      schema: ProductSchema,
    }),
  ],
  providers: [ProductsMongooseRepository],
  exports: [ProductsMongooseRepository],
})
export class ProductsMongooseModule {}
