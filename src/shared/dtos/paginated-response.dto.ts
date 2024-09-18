import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDTO<T> {
  @ApiProperty({ description: 'Dados paginados' })
  data: T[];

  @ApiProperty({ description: 'Página atual' })
  page: number;

  @ApiProperty({ description: 'Limite de registros da página' })
  limit: number;

  @ApiProperty({ description: 'Número total de páginas' })
  pagesCount: number;

  constructor(data: T[], page: number, limit: number, pagesCount: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.pagesCount = pagesCount;
  }
}
