import { Product } from '../entities/product.entity';

export interface IProductsRepository {
  import(data: any): Promise<Product>;
  update(id: string, data: any): Promise<Product>;
}
