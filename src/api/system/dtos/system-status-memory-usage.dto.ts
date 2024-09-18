import { ApiProperty } from '@nestjs/swagger';

export class SystemStatusMemoryUsageDTO {
  @ApiProperty()
  rss: string;

  @ApiProperty()
  heapUsed: string;

  @ApiProperty()
  heapTotal: string;
}
