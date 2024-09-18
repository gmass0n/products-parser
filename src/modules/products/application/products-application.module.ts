import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

import { ImportProductUseCase } from './import-product/import-product.use-case';
import { UpdateProductUseCase } from './update-product/update-product.use-case';
import { DeleteProductUseCase } from './delete-product/delete-product.use-case';
import { GetProductsUseCase } from './get-products/get-products.use-case';
import { GetProductUseCase } from './get-product/get-product.use-case';

@Module({
  providers: [
    ImportProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductsUseCase,
    GetProductUseCase,
  ],
  exports: [
    ImportProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductsUseCase,
    GetProductUseCase,
  ],
})
export class ProductsApplicationModule {
  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'],
  ): DynamicModule {
    return {
      module: ProductsApplicationModule,
      imports: [...infrastructure],
      providers: [],
    };
  }
}
