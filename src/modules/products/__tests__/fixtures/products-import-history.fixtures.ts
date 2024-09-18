import { faker } from '@faker-js/faker';

export class ProductsImportHistoryFixtures {
  static simpleFiles(): string[] {
    return [faker.system.fileName(), faker.system.fileName()];
  }
}
