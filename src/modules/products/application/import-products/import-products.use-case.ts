import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import * as zlib from 'zlib';
import * as fs from 'fs';
import * as path from 'path';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductsRepository } from '../ports/products.repository';
import { ProductImportHistoriesRepository } from '../ports/product-import-histories.repository';

@Injectable()
export class ImportProductsUseCase {
  private readonly logger = new Logger(ImportProductsUseCase.name);

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productImportHistoriesRepository: ProductImportHistoriesRepository,
  ) {}

  public async execute(): Promise<void> {
    this.logger.debug('Starting products importing...');

    const response = await axios.get(
      'https://challenges.coode.sh/food/data/json/index.txt',
    );
    const files = response.data.split('\n').filter(Boolean);

    this.logger.verbose(
      `${files.length} ${files.length === 1 ? 'file' : 'files'} were found: ${JSON.stringify(files)}`,
    );

    let savedProductsCount = 0;

    for (const file of files) {
      try {
        this.logger.log(`Processing file ${file}`);

        const filePath = path.join(__dirname, file.replace('gz', ''));

        await this.downloadAndSaveFile(file, filePath);

        const products = await this.parseProducts(filePath);

        const savedProducts = await this.saveProducts(products);
        savedProductsCount += savedProducts.length;
      } catch (error) {
        this.logger.error(`Error to process file ${file}`);
      }
    }

    await this.productImportHistoriesRepository.create(
      files,
      savedProductsCount,
    );

    this.logger.debug('Products importing finished successfully');
  }

  private async downloadAndSaveFile(
    fileName: string,
    filePath: string,
  ): Promise<void> {
    const response = await axios.get(
      `https://challenges.coode.sh/food/data/json/${fileName}`,
      { responseType: 'stream' },
    );

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  private async parseProducts(filePath: string): Promise<any[]> {
    const fileStream = fs.createReadStream(filePath);
    const decompressedStream = fileStream.pipe(zlib.createGunzip());

    const validProducts: any[] = [];
    let buffer = '';

    return new Promise((resolve, reject) => {
      decompressedStream.on('data', (chunk) => {
        buffer += chunk.toString();

        let lineEndIndex: number;
        while ((lineEndIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, lineEndIndex);
          buffer = buffer.slice(lineEndIndex + 1);

          try {
            const jsonLine = JSON.parse(line);
            const formattedCode = jsonLine.code?.replace(/[^0-9]/g, '');

            if (!Number.isNaN(formattedCode)) {
              validProducts.push({
                ...jsonLine,
                code: formattedCode,
              });
            }

            if (validProducts.length >= 100) {
              decompressedStream.destroy();
              return;
            }
          } catch (error) {}
        }
      });

      decompressedStream.on('end', () => resolve(validProducts));
      decompressedStream.on('close', () => resolve(validProducts));
      decompressedStream.on('error', (err) => reject(err));
    });
  }

  private async saveProducts(products: any[]): Promise<ProductEntity[]> {
    const savedProducts: ProductEntity[] = [];

    for (const product of products) {
      try {
        const { code, ...request } = product;

        const savedProduct = await this.productsRepository.update(
          code,
          {
            ...request,
            imported_t: new Date(),
          },
          true,
        );
        savedProducts.push(savedProduct);
      } catch (error) {
        this.logger.error(`Error to save product ${product.code}`, error);
      }
    }

    return savedProducts;
  }
}
