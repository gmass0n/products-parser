import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/shared/database/database.module';
import { ProductSchema } from './schemas/product.schema';
import { ProductsMongooseRepository } from './repositories/products.repository';
import { ProductImportHistorySchema } from './schemas/product-import-history.schema';

import { PRODUCT_IMPORT_HISTORY_MODEL, PRODUCT_MODEL } from './constants';
import { ProductImportHistoriesMongooseRepository } from './repositories/product-import-histories.repository';

@Module({
  imports: [
    DatabaseModule.forFeature({
      name: PRODUCT_MODEL,
      schema: ProductSchema,
    }),
    DatabaseModule.forFeature({
      name: PRODUCT_IMPORT_HISTORY_MODEL,
      schema: ProductImportHistorySchema,
    }),
  ],
  providers: [
    ProductsMongooseRepository,
    ProductImportHistoriesMongooseRepository,
  ],
  exports: [
    ProductsMongooseRepository,
    ProductImportHistoriesMongooseRepository,
  ],
})
export class ProductsMongooseModule {}
