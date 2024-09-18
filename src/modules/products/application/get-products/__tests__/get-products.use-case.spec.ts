import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { GetProductsUseCase } from '../get-products.use-case';
import { GetProductsQuery } from '../get-products.query';

describe('GetProducts UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['findAll']);

  it('should return paginated products', async () => {
    const products = ProductFixtures.simpleProductsList();

    productsRepository.findAll.mockResolvedValueOnce([
      products,
      products.length,
    ]);

    const sut = new GetProductsUseCase(productsRepository);

    const result = await sut.execute(new GetProductsQuery(1, 20));

    expect(productsRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(products);
    expect(result.data.length).toEqual(2);
    expect(result.data[0]).not.toBeNull();
    expect(result.data[1]).not.toBeNull();
  });
});
