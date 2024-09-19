import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/shared/database/database.module';
import { ProductSchema } from './schemas/product.schema';
import { ProductsMongooseRepository } from './repositories/products.repository';
import { ProductsImportHistorySchema } from './schemas/products-import-history.schema';

import { PRODUCTS_IMPORT_HISTORY_MODEL, PRODUCT_MODEL } from './constants';
import { ProductsImportHistoriesMongooseRepository } from './repositories/products-import-histories.repository';
import { ProductsRepository } from '../../application/ports/products.repository';
import { ProductsImportHistoriesRepository } from '../../application/ports/products-import-histories.repository';

@Module({
  imports: [
    DatabaseModule.forFeature({
      name: PRODUCT_MODEL,
      schema: ProductSchema,
    }),
    DatabaseModule.forFeature({
      name: PRODUCTS_IMPORT_HISTORY_MODEL,
      schema: ProductsImportHistorySchema,
    }),
  ],
  providers: [
    ProductsMongooseRepository,
    ProductsImportHistoriesMongooseRepository,
    {
      provide: ProductsRepository,
      useClass: ProductsMongooseRepository,
    },
    {
      provide: ProductsImportHistoriesRepository,
      useClass: ProductsImportHistoriesMongooseRepository,
    },
  ],
  exports: [ProductsRepository, ProductsImportHistoriesRepository],
})
export class ProductsMongooseModule {}
