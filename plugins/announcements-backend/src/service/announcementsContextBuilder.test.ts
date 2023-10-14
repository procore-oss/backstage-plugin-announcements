import { PermissionEvaluator } from '@backstage/plugin-permission-common';
import { buildAnnouncementsContext } from './announcementsContextBuilder';
import { getVoidLogger } from '@backstage/backend-common';
import { initializePersistenceContext } from './persistence/persistenceContext';

jest.mock('./persistence/persistenceContext', () => ({
  initializePersistenceContext: jest.fn(),
}));

describe('buildAnnouncementsContext', () => {
  it('returns context with logger, persistenceContext, and permissions properties', async () => {
    const logger = getVoidLogger();
    const database = {
      getClient: jest.fn(),
      url: 'url',
    };
    const permissions: PermissionEvaluator = {
      authorize: jest.fn(),
      authorizeConditional: jest.fn(),
    };

    const context = await buildAnnouncementsContext({
      logger,
      database,
      permissions,
    });

    expect(context).toStrictEqual({
      logger,
      persistenceContext: await initializePersistenceContext(database),
      permissions,
    });
  });
});
