import { ProductImportHistoryEntity } from '../entities/product-import-history.entity';

export interface IProductImportHistoriesRepository {
  create(
    fileName: string,
    productsCount: number,
  ): Promise<ProductImportHistoryEntity>;
}
