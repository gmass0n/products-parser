import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  url?: string;

  @ApiPropertyOptional()
  creator?: string;

  @ApiPropertyOptional()
  created_t?: Date;

  @ApiPropertyOptional()
  last_modified_t?: Date;

  @ApiPropertyOptional()
  product_name?: string;

  @ApiPropertyOptional()
  quantity?: string;

  @ApiPropertyOptional()
  brands?: string;

  @ApiPropertyOptional()
  categories?: string;

  @ApiPropertyOptional()
  labels?: string;

  @ApiPropertyOptional()
  cities?: string;

  @ApiPropertyOptional()
  purchase_places?: string;

  @ApiPropertyOptional()
  stores?: string;

  @ApiPropertyOptional()
  ingredients_text?: string;

  @ApiPropertyOptional()
  traces?: string;

  @ApiPropertyOptional()
  serving_size?: string;

  @ApiPropertyOptional()
  serving_quantity?: number;

  @ApiPropertyOptional()
  nutriscore_score?: number;

  @ApiPropertyOptional()
  nutriscore_grade?: string;

  @ApiPropertyOptional()
  main_category?: string;

  @ApiPropertyOptional()
  image_url?: string;
}
