import { ProductEntity } from '../../domain/entities/product.entity';

export abstract class ProductsRepository {
  abstract update(
    code: number,
    data: Partial<Omit<ProductEntity, 'code'>>,
    upsert?: boolean,
  ): Promise<ProductEntity>;
  abstract delete(code: number): Promise<ProductEntity>;
  abstract findAll(
    page?: number,
    limit?: number,
  ): Promise<[ProductEntity[], number]>;
  abstract findByCode(code: number): Promise<ProductEntity>;
}
