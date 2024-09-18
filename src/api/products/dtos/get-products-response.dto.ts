import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDTO } from '~/shared/dtos/paginated-response.dto';
import { ProductResponseDTO } from './product-response.dto';

export class GetProductsResponseDTO extends PaginatedResponseDTO<ProductResponseDTO> {
  @ApiProperty({ description: 'Dados paginados', type: [ProductResponseDTO] })
  public data: ProductResponseDTO[];
}
