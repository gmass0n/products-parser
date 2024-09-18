import { ProductEntity } from '../entities/product.entity';

export interface IProductsRepository {
  import(data: any): Promise<ProductEntity>;
  update(
    code: string,
    data: Partial<Omit<ProductEntity, 'code'>>,
  ): Promise<ProductEntity>;
  delete(code: string): Promise<ProductEntity>;
  findAll(page?: number, limit?: number): Promise<[ProductEntity[], number]>;
  findByCode(code: string): Promise<ProductEntity>;
}
