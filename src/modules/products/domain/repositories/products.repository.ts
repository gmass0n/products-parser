import { ProductEntity } from '../entities/product.entity';

export interface IProductsRepository {
  update(
    code: string,
    data: Partial<Omit<ProductEntity, 'code'>>,
    upsert?: boolean,
  ): Promise<ProductEntity>;
  delete(code: string): Promise<ProductEntity>;
  findAll(page?: number, limit?: number): Promise<[ProductEntity[], number]>;
  findByCode(code: string): Promise<ProductEntity>;
}
