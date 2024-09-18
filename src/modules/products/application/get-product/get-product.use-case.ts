import { Injectable } from '@nestjs/common';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../ports/products.repository';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(code: number): Promise<ProductEntity> {
    return await this.productsRepository.findByCode(code);
  }
}
