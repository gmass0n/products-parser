import { ApiProperty } from '@nestjs/swagger';

import { SystemDatabaseConnectionStatusEnum } from '~/modules/system/domain/enums/system-database-connection-status.enum';
import { SystemStatusMemoryUsageDTO } from './system-status-memory-usage.dto';

export class SystemStatusResponseDTO {
  @ApiProperty({
    enum: SystemDatabaseConnectionStatusEnum,
    description: 'Status da conexão com o banco de dados',
  })
  databaseConnectionStatus: SystemDatabaseConnectionStatusEnum;

  @ApiProperty({
    description: 'Horário da última vez que as CRON foram executadadas',
  })
  lastCronExecution: Record<string, string>;

  @ApiProperty({ description: 'Tempo online' })
  uptime: string;

  @ApiProperty({
    type: SystemStatusMemoryUsageDTO,
    description: 'Uso da memoria',
  })
  memoryUsage: SystemStatusMemoryUsageDTO;
}
