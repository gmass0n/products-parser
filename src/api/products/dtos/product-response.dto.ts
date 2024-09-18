import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusEnum } from '~/modules/products/domain/enums/product-status.enum';

export class ProductResponseDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  code: number;

  @ApiProperty({ enum: ProductStatusEnum })
  status: ProductStatusEnum;

  @ApiProperty()
  imported_t: Date;

  @ApiProperty()
  url: string;

  @ApiProperty()
  creator: string;

  @ApiProperty()
  created_t: Date;

  @ApiProperty()
  last_modified_t: Date;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  brands: string;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  labels: string;

  @ApiProperty()
  cities: string;

  @ApiProperty()
  purchase_places: string;

  @ApiProperty()
  stores: string;

  @ApiProperty()
  ingredients_text: string;

  @ApiProperty()
  traces: string;

  @ApiProperty()
  serving_size: string;

  @ApiProperty()
  serving_quantity: number;

  @ApiProperty()
  nutriscore_score: number;

  @ApiProperty()
  nutriscore_grade: string;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  image_url: string;
}
