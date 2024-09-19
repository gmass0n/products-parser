import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PRODUCTS_IMPORT_HISTORY_MODEL } from '../constants';
import { IProductsImportHistoriesRepository } from '~/modules/products/domain/repositories/products-import-histories.repository';
import { ProductsImportHistoryEntity } from '~/modules/products/domain/entities/products-import-history.entity';

@Injectable()
export class ProductsImportHistoriesMongooseRepository
  implements IProductsImportHistoriesRepository
{
  constructor(
    @InjectModel(PRODUCTS_IMPORT_HISTORY_MODEL)
    private readonly productImportHistoryModel: Model<ProductsImportHistoryEntity>,
  ) {}

  public async create(
    files: string[],
    productsCount: number,
  ): Promise<ProductsImportHistoryEntity> {
    return await this.productImportHistoryModel.create({
      files,
      imported_at: new Date(),
      products_count: productsCount,
    });
  }
}
