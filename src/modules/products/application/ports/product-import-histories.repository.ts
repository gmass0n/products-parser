import { ProductImportHistoryEntity } from '../../domain/entities/product-import-history.entity';

export abstract class ProductImportHistoriesRepository {
  abstract create(
    files: string[],
    productsCount: number,
  ): Promise<ProductImportHistoryEntity>;
}
