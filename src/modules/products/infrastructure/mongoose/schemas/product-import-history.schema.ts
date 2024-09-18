import { Schema } from 'mongoose';

import { ProductImportHistoryEntity } from '~/modules/products/domain/entities/product-import-history.entity';

export const ProductImportHistorySchema =
  new Schema<ProductImportHistoryEntity>(
    {
      files: { type: [String], required: true },
      imported_at: { type: Date, required: true },
      products_count: { type: Number, required: true },
    },
    { timestamps: false },
  );
