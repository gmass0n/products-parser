import { Injectable } from '@nestjs/common';

import { GetProductsQuery } from './get-products.query';
import { PaginatedResultQuery } from '~/shared/domain/queries/paginated-result.query';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../ports/products.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

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
      Number(page),
      Number(limit),
      Math.ceil(count / limit),
    );
  }
}
