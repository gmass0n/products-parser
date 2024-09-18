import { Injectable } from '@nestjs/common';

import { ProductsMongooseRepository } from '../../infrastructure/mongoose/repositories/products.repository';
import { GetProductsQuery } from './get-products.query';
import { PaginatedResultQuery } from '~/shared/domain/queries/paginated-result.query';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    private readonly productsRepository: ProductsMongooseRepository,
  ) {}

  public async execute({
    page = 1,
    limit = 20,
  }: GetProductsQuery): Promise<PaginatedResultQuery<ProductEntity>> {
    const [products, count] = await this.productsRepository.findAll(
      page,
      limit,
    );

    return new PaginatedResultQuery(
      products,
      page,
      limit,
      Math.ceil(count / limit),
    );
  }
}
