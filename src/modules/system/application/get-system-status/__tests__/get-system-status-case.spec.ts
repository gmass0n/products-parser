import { createSpyObj } from 'jest-createspyobj';
import { faker } from '@faker-js/faker';
import { SchedulerRegistry } from '@nestjs/schedule';

import { SystemRepository } from '../../ports/system.repository';
import { SystemDatabaseConnectionStatusEnum } from '~/modules/system/domain/enums/system-database-connection-status.enum';
import { GetSystemStatusUseCase } from '../get-system-status.use-case';
import { cronConfig } from '~/shared/configs/cron.config';
import { SystemStatusEntity } from '~/modules/system/domain/entities/system-status.entity';

describe('GetSystemStatus UseCase', () => {
  const systemRepository = createSpyObj(SystemRepository, [
    'checkDatabaseConnection',
  ]);
  const schedulerRegistry = createSpyObj(SchedulerRegistry, ['getCronJob']);

  it('should return system status', async () => {
    const mockDbStatus = SystemDatabaseConnectionStatusEnum.success;
    systemRepository.checkDatabaseConnection.mockResolvedValueOnce(
      mockDbStatus,
    );

    Object.values(cronConfig).forEach(() => {
      schedulerRegistry.getCronJob.mockReturnValueOnce({
        lastDate: jest.fn().mockReturnValue(faker.date.past()),
      } as any);
    });

    const useCase = new GetSystemStatusUseCase(
      systemRepository,
      schedulerRegistry,
    );
    const result = await useCase.execute();

    expect(systemRepository.checkDatabaseConnection).toHaveBeenCalled();
    expect(schedulerRegistry.getCronJob).toHaveBeenCalledTimes(
      Object.values(cronConfig).length,
    );
    expect(result).toBeInstanceOf(SystemStatusEntity);
    expect(result.databaseConnectionStatus).toBe(mockDbStatus);
  });
});
