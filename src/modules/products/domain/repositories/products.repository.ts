import { ProductEntity } from '../entities/product.entity';

export interface IProductsRepository {
  update(
    code: number,
    data: Partial<Omit<ProductEntity, 'code'>>,
    upsert?: boolean,
  ): Promise<ProductEntity>;
  delete(code: number): Promise<ProductEntity>;
  findAll(page?: number, limit?: number): Promise<[ProductEntity[], number]>;
  findByCode(code: number): Promise<ProductEntity>;
}
