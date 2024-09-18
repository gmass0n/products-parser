import { Injectable } from '@nestjs/common';
import { ImportProductUseCase } from './application/import-product/import-product.use-case';
import { UpdateProductUseCase } from './application/update-product/update-product.use-case';
import { DeleteProductUseCase } from './application/delete-product/delete-product.use-case';
import { GetProductsUseCase } from './application/get-products/get-products.use-case';
import { GetProductUseCase } from './application/get-product/get-product.use-case';
import { GetProductsQuery } from './application/get-products/get-products.query';

@Injectable()
export class ProductsFacade {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly importProductUseCase: ImportProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  public async getProducts(query: GetProductsQuery) {
    return this.getProductsUseCase.execute(query);
  }

  public async getProduct(code: string) {
    return this.getProductUseCase.execute(code);
  }

  public async update(code: string) {
    return this.updateProductUseCase.execute(code);
  }

  public async delete(code: string) {
    return this.deleteProductUseCase.execute(code);
  }
}
