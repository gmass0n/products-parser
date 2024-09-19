import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { GetProductsUseCase } from '../get-products.use-case';
import { GetProductsQuery } from '../get-products.query';

describe('GetProducts UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['findAll']);

  it('should return paginated products', async () => {
    const productsCount = 2;
    const products = ProductFixtures.simpleProductsList(productsCount);

    productsRepository.findAll.mockResolvedValueOnce([
      products,
      products.length,
    ]);

    const query = new GetProductsQuery(1, 20);

    const useCase = new GetProductsUseCase(productsRepository);
    const result = await useCase.execute(query);

    expect(productsRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(products);
    expect(result.page).toEqual(query.page);
    expect(result.limit).toEqual(query.limit);
    expect(result.data.length).toEqual(productsCount);
    expect(result.data[0]).not.toBeNull();
    expect(result.data[1]).not.toBeNull();
  });
});
