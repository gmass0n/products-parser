import { Injectable } from '@nestjs/common';
import { ImportProductsUseCase } from './application/import-products/import-products.use-case';
import { UpdateProductUseCase } from './application/update-product/update-product.use-case';
import { DeleteProductUseCase } from './application/delete-product/delete-product.use-case';
import { GetProductsUseCase } from './application/get-products/get-products.use-case';
import { GetProductUseCase } from './application/get-product/get-product.use-case';
import { GetProductsQuery } from './application/get-products/get-products.query';
import { ProductEntity } from './domain/entities/product.entity';

@Injectable()
export class ProductsFacade {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly importProductsUseCase: ImportProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  public async getProducts(query: GetProductsQuery) {
    return this.getProductsUseCase.execute(query);
  }

  public async getProduct(code: number) {
    return this.getProductUseCase.execute(code);
  }

  public async updateProduct(
    code: number,
    data: Partial<Omit<ProductEntity, 'code'>>,
  ) {
    return this.updateProductUseCase.execute(code, data);
  }

  public async deleteProduct(code: number) {
    return this.deleteProductUseCase.execute(code);
  }

  public async importProducts() {
    return this.importProductsUseCase.execute();
  }
}
