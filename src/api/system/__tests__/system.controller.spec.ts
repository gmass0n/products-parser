import { createSpyObj } from 'jest-createspyobj';
import { SystemFacade } from '~/modules/system/system.facade';
import { SystemController } from '../system.controller';
import { SystemFixtures } from '~/modules/system/__tests__/fixtures/system.fixtures';

describe('SystemController', () => {
  const systemFacade = createSpyObj(SystemFacade);

  it('should return system status', async () => {
    const systemStatus = SystemFixtures.simpleSystemStatus();
    systemFacade.getSystemStatus.mockResolvedValueOnce(systemStatus);

    const controller = new SystemController(systemFacade);
    const result = await controller.showStatus(null);

    expect(systemFacade.getSystemStatus).toHaveBeenCalledTimes(1);
    expect(result).toBe(systemStatus);
  });
});
