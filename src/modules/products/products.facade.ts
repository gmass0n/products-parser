import { Injectable } from '@nestjs/common';
import { ImportProductUseCase } from './application/import-product/import-product.use-case';
import { UpdateProductUseCase } from './application/update-product/update-product.use-case';

@Injectable()
export class ProductsFacade {
  constructor(
    private readonly importProductUseCase: ImportProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  public async import(data: any) {
    return this.importProductUseCase.execute(data);
  }

  public async update(id: string, data: any) {
    return this.updateProductUseCase.execute(id, data);
  }
}
