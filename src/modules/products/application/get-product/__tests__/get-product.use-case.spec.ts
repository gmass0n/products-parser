import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { GetProductUseCase } from '../get-product.use-case';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';

describe('GetProduct UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['findByCode']);

  it('should return a product', async () => {
    const product = ProductFixtures.simpleProduct();

    productsRepository.findByCode.mockResolvedValueOnce(product);

    const sut = new GetProductUseCase(productsRepository);

    const result = await sut.execute(product.code);

    expect(productsRepository.findByCode).toHaveBeenCalledWith(product.code);
    expect(result).toEqual(product);
  });
});
