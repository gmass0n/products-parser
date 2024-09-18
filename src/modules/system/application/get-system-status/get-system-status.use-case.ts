import { Injectable } from '@nestjs/common';

import { SystemMongooseRepository } from '../../infrastructure/mongoose/repositories/system.repository';
import { SystemStatusEntity } from '../../domain/entities/system-status.entity';

@Injectable()
export class GetSystemStatusUseCase {
  constructor(private readonly systemRepository: SystemMongooseRepository) {}

  public async execute(): Promise<SystemStatusEntity> {
    const dbStatus = await this.systemRepository.checkDatabaseConnection();
    const lastCronExecution =
      await this.systemRepository.getLastCronExecution();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    return {
      databaseConnectionStatus: dbStatus,
      lastCronExecution: lastCronExecution,
      uptime: this.formatUptime(uptime),
      memoryUsage: this.formatMemoryUsage(memoryUsage),
    };
  }

  private formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${minutes}:${secs}`;
  }

  private formatMemoryUsage(
    memory: NodeJS.MemoryUsage,
  ): SystemStatusEntity['memoryUsage'] {
    return {
      rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
    };
  }
}
