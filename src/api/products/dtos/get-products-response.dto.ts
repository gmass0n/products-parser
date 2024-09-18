import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDTO } from '~/shared/dtos/paginated-response.dto';

export class GetProductsResponseDTO extends PaginatedResponseDTO<any> {
  @ApiProperty({ description: 'Dados paginados', type: [] })
  public data: any[];
}
