import { Injectable } from '@nestjs/common';

import { ProductsMongooseRepository } from '../../infrastructure/mongoose/repositories/products.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductUseCase {
  constructor(
    private readonly productsRepository: ProductsMongooseRepository,
  ) {}

  public async execute(code: string): Promise<ProductEntity> {
    return await this.productsRepository.findByCode(code);
  }
}
