import { cronConfig } from '~/shared/configs/cron.config';
import { SystemStatusEntity } from '../../domain/entities/system-status.entity';
import { SystemDatabaseConnectionStatusEnum } from '../../domain/enums/system-database-connection-status.enum';
import { faker } from '@faker-js/faker/.';

export class SystemFixtures {
  static simpleSystemStatus(): SystemStatusEntity {
    const lastCronExecution = this.simpleLastCronExecution();

    return new SystemStatusEntity(
      SystemDatabaseConnectionStatusEnum.success,
      lastCronExecution,
      process.uptime(),
      process.memoryUsage(),
    );
  }

  static simpleLastCronExecution(): Record<string, string> {
    return Object.keys(cronConfig).reduce(
      (acc, key) => ({
        ...acc,
        [key]: faker.date.past().toISOString(),
      }),
      {},
    );
  }
}
