import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PRODUCT_IMPORT_HISTORY_MODEL } from '../constants';
import { IProductImportHistoriesRepository } from '~/modules/products/domain/repositories/product-import-histories.repository';
import { ProductImportHistoryEntity } from '~/modules/products/domain/entities/product-import-history.entity';

@Injectable()
export class ProductImportHistoriesMongooseRepository
  implements IProductImportHistoriesRepository
{
  constructor(
    @InjectModel(PRODUCT_IMPORT_HISTORY_MODEL)
    private readonly productImportHistoryModel: Model<ProductImportHistoryEntity>,
  ) {}

  public async create(
    files: string[],
    productsCount: number,
  ): Promise<ProductImportHistoryEntity> {
    return await this.productImportHistoryModel.create({
      files,
      imported_at: new Date(),
      products_count: productsCount,
    });
  }
}
