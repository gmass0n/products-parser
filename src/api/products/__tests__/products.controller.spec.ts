import { ProductsFacade } from '~/modules/products/products.facade';
import { GetProductsQuery } from '~/modules/products/application/get-products/get-products.query';
import { createSpyObj } from 'jest-createspyobj';
import { GetProductsResponseDTO } from '../dtos/get-products-response.dto';
import { ProductsController } from '../products.controller';
import { ProductFixtures } from '~/modules/products/__tests__/fixtures/product.fixtures';
import { ProductEntity } from '~/modules/products/domain/entities/product.entity';
import { ProductStatusEnum } from '~/modules/products/domain/enums/product-status.enum';

describe('ProductsController', () => {
  const productsFacade = createSpyObj(ProductsFacade);

  it('should return products list', async () => {
    const query = new GetProductsQuery(1, 20);
    const products = ProductFixtures.simpleProductsList(10);
    const productsCount = products.length;

    const mockResponse = new GetProductsResponseDTO(
      products,
      query.page,
      query.limit,
      Math.ceil(productsCount / query.limit),
    );

    productsFacade.getProducts.mockResolvedValueOnce(mockResponse);

    const controller = new ProductsController(productsFacade);
    const result = await controller.index(null, query);

    expect(productsFacade.getProducts).toHaveBeenCalledWith(query);
    expect(result).toBe(mockResponse);
  });

  it('should return product details', async () => {
    const product = ProductFixtures.simpleProduct();
    productsFacade.getProduct.mockResolvedValueOnce(product);

    const controller = new ProductsController(productsFacade);
    const result = await controller.show(null, String(product.code));

    expect(productsFacade.getProduct).toHaveBeenCalledWith(product.code);
    expect(productsFacade.getProduct).toHaveBeenCalledTimes(1);
    expect(result).toBe(product);
  });

  it('should update a product', async () => {
    const product = ProductFixtures.simpleProduct();

    const newBrands = 'Nike';
    const updatedProduct: ProductEntity = { ...product, brands: newBrands };
    productsFacade.updateProduct.mockResolvedValueOnce(updatedProduct);

    const controller = new ProductsController(productsFacade);
    const result = await controller.update(
      null,
      String(product.code),
      updatedProduct,
    );

    expect(productsFacade.updateProduct).toHaveBeenCalledWith(
      product.code,
      updatedProduct,
    );
    expect(productsFacade.updateProduct).toHaveBeenCalledTimes(1);
    expect(result).toBe(updatedProduct);
  });

  it('should delete a product ', async () => {
    const deletedProduct = ProductFixtures.simpleDeletedProduct();
    productsFacade.deleteProduct.mockResolvedValueOnce(deletedProduct);

    const controller = new ProductsController(productsFacade);
    const result = await controller.delete(null, String(deletedProduct.code));

    expect(productsFacade.deleteProduct).toHaveBeenCalledWith(
      deletedProduct.code,
    );
    expect(result.status).toBe(ProductStatusEnum.draft);
  });
});
