import { ProductImportHistoryEntity } from '../entities/product-import-history.entity';

export interface IProductImportHistoriesRepository {
  create(
    files: string[],
    productsCount: number,
  ): Promise<ProductImportHistoryEntity>;
}
