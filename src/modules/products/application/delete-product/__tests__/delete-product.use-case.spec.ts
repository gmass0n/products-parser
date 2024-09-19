import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { DeleteProductUseCase } from '../delete-product.use-case';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { ProductStatusEnum } from '~/modules/products/domain/enums/product-status.enum';

describe('DeleteProduct UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['delete']);

  it('should delete a product', async () => {
    const deletedProduct = ProductFixtures.simpleDeletedProduct();

    productsRepository.delete.mockResolvedValueOnce(deletedProduct);

    const useCase = new DeleteProductUseCase(productsRepository);
    const result = await useCase.execute(deletedProduct.code);

    expect(productsRepository.delete).toHaveBeenCalledWith(deletedProduct.code);
    expect(result.status).toBe(ProductStatusEnum.draft);
  });
});
