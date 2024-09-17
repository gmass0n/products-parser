import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from '../interfaces/product.interface';
import { IProductsRepository } from '~/modules/products/domain/repositories/products.repository';

import { PRODUCT_MODEL } from '../constants';
import { Product } from '~/modules/products/domain/entities/product.entity';

@Injectable()
export class ProductsMongooseRepository implements IProductsRepository {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: Model<IProduct>,
  ) {}

  public async import(data: any): Promise<Product> {
    console.log('import', data);
    return null;
  }

  public async update(id: string, data: any): Promise<Product> {
    console.log('update', data);
    return null;
  }
}
