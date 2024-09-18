import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductStatusEnum } from '../../domain/enums/product-status.enum';

export class ProductFixtures {
  static simpleProduct(): ProductEntity {
    return new ProductEntity('1', 123, ProductStatusEnum.published, new Date());
  }
}
