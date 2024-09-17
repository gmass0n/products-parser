import { Injectable } from '@nestjs/common';

import { ProductsMongooseRepository } from '../../infrastructure/mongoose/repositories/products.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productsRepository: ProductsMongooseRepository,
  ) {}

  public async execute(id: string, data: any): Promise<any> {
    console.log('UpdateProductUseCase', id, data);
  }
}
