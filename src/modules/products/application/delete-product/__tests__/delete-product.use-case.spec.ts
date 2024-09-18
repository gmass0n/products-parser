import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { DeleteProductUseCase } from '../delete-product.use-case';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { ProductStatusEnum } from '~/modules/products/domain/enums/product-status.enum';

describe('DeleteProduct UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['delete']);

  it('should delete a product', async () => {
    const product = ProductFixtures.simpleProduct();

    const updatedProduct = { ...product, status: ProductStatusEnum.draft };
    productsRepository.delete.mockResolvedValueOnce(updatedProduct);

    const sut = new DeleteProductUseCase(productsRepository);

    const result = await sut.execute(product.code);

    expect(productsRepository.delete).toHaveBeenCalledWith(product.code);
    expect(result).toEqual(updatedProduct);
    expect(result.status).toBe(ProductStatusEnum.draft);
  });
});
