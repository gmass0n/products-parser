import { Injectable } from '@nestjs/common';

import { ProductsMongooseRepository } from '../../infrastructure/mongoose/repositories/products.repository';

@Injectable()
export class ImportProductUseCase {
  constructor(
    private readonly productsRepository: ProductsMongooseRepository,
  ) {}

  public async execute(data: any): Promise<any> {
    console.log('ImportProductUseCase', data);
    // await this.productRepository.save(product);
  }
}
