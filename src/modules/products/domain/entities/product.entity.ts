import { ProductStatusEnum } from '../enums/product-status.enum';

export class ProductEntity {
  constructor(
    public readonly code: number,
    public readonly status: ProductStatusEnum,
    public readonly imported_t: Date,
    public readonly url: string,
    public readonly creator: string,
    public readonly created_t: Date,
    public readonly last_modified_t: Date,
    public readonly product_name: string,
    public readonly quantity: string,
    public readonly brands: string,
    public readonly categories: string,
    public readonly labels: string,
    public readonly cities: string,
    public readonly purchase_places: string,
    public readonly stores: string,
    public readonly ingredients_text: string,
    public readonly traces: string,
    public readonly serving_size: string,
    public readonly serving_quantity: number,
    public readonly nutriscore_score: number,
    public readonly nutriscore_grade: string,
    public readonly main_category: string,
    public readonly image_url: string,
  ) {}
}
