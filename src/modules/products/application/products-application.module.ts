import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

import { ImportProductUseCase } from './import-product/import-product.use-case';
import { UpdateProductUseCase } from './update-product/update-product.use-case';

@Module({
  providers: [ImportProductUseCase, UpdateProductUseCase],
  exports: [ImportProductUseCase, UpdateProductUseCase],
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
