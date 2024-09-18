import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedRequestDto {
  @ApiPropertyOptional({ description: 'Limite de registros' })
  limit?: number;

  @ApiPropertyOptional({ description: 'Página' })
  page?: number;
}
