import { Injectable } from '@nestjs/common';

import { SystemStatusEntity } from '../../domain/entities/system-status.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { cronConfig } from '~/shared/configs/cron.config';
import { SystemRepository } from '../ports/system.repository';

@Injectable()
export class GetSystemStatusUseCase {
  constructor(
    private readonly systemRepository: SystemRepository,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public async execute(): Promise<SystemStatusEntity> {
    const dbStatus = await this.systemRepository.checkDatabaseConnection();
    const lastCronExecution = await this.getLastCronExecution();

    return new SystemStatusEntity(
      dbStatus,
      lastCronExecution,
      process.uptime(),
      process.memoryUsage(),
    );
  }

  public async getLastCronExecution(): Promise<Record<string, string>> {
    return Object.values(cronConfig).reduce(
      (acc, cron) => {
        const lastExecution =
          this.schedulerRegistry
            .getCronJob(cron.name)
            ?.lastDate()
            ?.toISOString() || '';

        return { ...acc, [cron.name]: lastExecution };
      },
      {} as Record<string, string>,
    );
  }
}
