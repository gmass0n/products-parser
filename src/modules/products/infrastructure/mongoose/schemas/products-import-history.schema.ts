import { Schema } from 'mongoose';

import { ProductsImportHistoryEntity } from '~/modules/products/domain/entities/products-import-history.entity';

export const ProductsImportHistorySchema =
  new Schema<ProductsImportHistoryEntity>(
    {
      files: { type: [String], required: true },
      imported_at: { type: Date, required: true },
      products_count: { type: Number, required: true },
    },
    { timestamps: false },
  );
