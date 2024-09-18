import { Injectable } from '@nestjs/common';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../ports/products.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(
    code: number,
    data: Partial<Omit<ProductEntity, 'code'>>,
  ): Promise<ProductEntity> {
    return this.productsRepository.update(code, data);
  }
}
