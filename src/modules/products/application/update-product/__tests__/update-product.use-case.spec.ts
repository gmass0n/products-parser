import { createSpyObj } from 'jest-createspyobj';

import { ProductsRepository } from '../../ports/products.repository';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { ProductEntity } from '~/modules/products/domain/entities/product.entity';
import { UpdateProductUseCase } from '../update-product.use-case';

describe('UpdateProduct UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['update']);

  it('should update a product', async () => {
    const product = ProductFixtures.simpleProduct();

    const newBrands = 'Nike';
    const updatedProduct: ProductEntity = { ...product, brands: newBrands };
    productsRepository.update.mockResolvedValueOnce(updatedProduct);

    const sut = new UpdateProductUseCase(productsRepository);

    const result = await sut.execute(product.code, updatedProduct);

    expect(productsRepository.update).toHaveBeenCalledWith(
      product.code,
      updatedProduct,
    );
    expect(result).toEqual(updatedProduct);
    expect(result.brands).toBe(newBrands);
  });
});
