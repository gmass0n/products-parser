import { ProductsImportHistoryEntity } from '../entities/products-import-history.entity';

export interface IProductsImportHistoriesRepository {
  create(
    files: string[],
    productsCount: number,
  ): Promise<ProductsImportHistoryEntity>;
}
