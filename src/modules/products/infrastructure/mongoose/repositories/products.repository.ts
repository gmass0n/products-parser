import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProductsRepository } from '~/modules/products/domain/repositories/products.repository';

import { PRODUCT_MODEL } from '../constants';
import { ProductEntity } from '~/modules/products/domain/entities/product.entity';
import { ProductStatusEnum } from '~/modules/products/domain/enums/product-status.enum';

@Injectable()
export class ProductsMongooseRepository implements IProductsRepository {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  public async update(
    code: string,
    data: Partial<Omit<ProductEntity, 'code'>>,
    upsert?: boolean,
  ): Promise<ProductEntity> {
    return await this.productModel
      .findOneAndUpdate({ code }, { $set: data }, { new: true, upsert })
      .lean()
      .exec();
  }

  public async delete(code: string): Promise<ProductEntity> {
    return await this.productModel
      .findOneAndUpdate(
        { code },
        { $set: { status: ProductStatusEnum.trash } },
        { new: true },
      )
      .lean()
      .exec();
  }

  public async findAll(
    page = 1,
    limit = 20,
  ): Promise<[ProductEntity[], number]> {
    return Promise.all([
      await this.productModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .lean()
        .exec(),
      await this.productModel.countDocuments().exec(),
    ]);
  }

  public async findByCode(code: string): Promise<ProductEntity> {
    return await this.productModel.findOne({ code }).lean().exec();
  }
}
