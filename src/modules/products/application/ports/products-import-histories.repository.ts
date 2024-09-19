import { ProductsImportHistoryEntity } from '../../domain/entities/products-import-history.entity';

export abstract class ProductsImportHistoriesRepository {
  abstract create(
    files: string[],
    productsCount: number,
  ): Promise<ProductsImportHistoryEntity>;
}
