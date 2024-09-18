import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductStatusEnum } from '../../domain/enums/product-status.enum';
import { faker } from '@faker-js/faker';

export class ProductFixtures {
  static simpleProduct(): ProductEntity {
    return new ProductEntity(
      faker.string.uuid(),
      faker.number.int(),
      ProductStatusEnum.published,
      faker.date.past(),
    );
  }

  static simpleProductsList(count: number): ProductEntity[] {
    return new Array(count).map(() => this.simpleProduct());
  }
}
