import { createSpyObj } from 'jest-createspyobj';

import axios from 'axios';
import * as fs from 'fs';
import * as zlib from 'zlib';

import { ProductsRepository } from '../../ports/products.repository';
import { ProductsImportHistoriesRepository } from '../../ports/products-import-histories.repository';
import { ProductFixtures } from '../../../__tests__/fixtures/product.fixtures';
import { ImportProductsUseCase } from '../import-products.use-case';
import { ProductsImportHistoryFixtures } from '~/modules/products/__tests__/fixtures/products-import-history.fixtures';
import { ProductsImportHistoryEntity } from '~/modules/products/domain/entities/products-import-history.entity';
import { Readable } from 'stream';

jest.mock('axios');
jest.mock('fs');
jest.mock('zlib');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedZlib = zlib as jest.Mocked<typeof zlib>;

describe('ImportProducts UseCase', () => {
  const productsRepository = createSpyObj(ProductsRepository, ['update']);
  const productsImportHistoriesRepository = createSpyObj(
    ProductsImportHistoriesRepository,
    ['create'],
  );

  beforeEach(() => {
    mockedFs.createWriteStream.mockReturnValue({
      on: jest.fn().mockImplementation((event, cb) => {
        if (event === 'finish') cb();
        return this;
      }),
    } as unknown as fs.WriteStream);

    mockedFs.createReadStream.mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        on: jest.fn().mockImplementation((event, cb) => {
          if (event === 'data') cb('{}');
          if (event === 'end') cb();
          return this;
        }),
      }),
    } as any);

    mockedZlib.createGunzip.mockReturnValue(
      new Readable({
        read() {
          this.push('{}');
          this.push(null);
        },
      }) as any,
    );
  });

  it('should import products', async () => {
    const files = ProductsImportHistoryFixtures.simpleFiles();
    mockedAxios.get.mockResolvedValueOnce({
      data: files.join('\n'),
    });

    const savedProducts = files.flatMap(() => {
      const products = ProductFixtures.simpleProductsList(2);
      mockedAxios.get.mockResolvedValueOnce({
        data: JSON.stringify(products),
      });

      products.forEach((product) => {
        productsRepository.update.mockResolvedValueOnce(product);
      });

      return products;
    });
    const savedProductsCount = savedProducts.length;

    const productsImportHistory = new ProductsImportHistoryEntity(
      files,
      new Date(),
      savedProductsCount,
    );
    productsImportHistoriesRepository.create.mockResolvedValueOnce(
      productsImportHistory,
    );

    const useCase = new ImportProductsUseCase(
      productsRepository,
      productsImportHistoriesRepository,
    );
    await useCase.execute();

    expect(productsRepository.update).toHaveBeenCalledTimes(savedProductsCount);
    expect(productsImportHistoriesRepository.create).toHaveBeenCalledWith(
      files,
      savedProductsCount,
    );
  }, 10000);
});
