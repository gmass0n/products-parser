import { ApiProperty } from '@nestjs/swagger';

export class BaseHeaders {
  @ApiProperty({ description: 'Chave da API' })
  'x-api-key': string;
}
