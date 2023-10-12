import { TestDatabases } from '@backstage/backend-test-utils';
import { AnnouncementsDatabase } from './AnnouncementsDatabase';
import { Knex } from 'knex';
import { initializePersistenceContext } from './persistenceContext';

function createDatabaseManager(client: Knex, skipMigrations: boolean = false) {
  return {
    getClient: async () => client,
    migrations: {
      skip: skipMigrations,
    },
  };
}

describe('AnnouncementsDatabase', () => {
  const databases = TestDatabases.create();
  let store: AnnouncementsDatabase;
  let testDbClient: Knex<any, unknown[]>;
  let database;

  beforeAll(async () => {
    testDbClient = await databases.init('SQLITE_3');
    database = createDatabaseManager(testDbClient);
    store = (await initializePersistenceContext(database)).announcementsStore;
  });

  afterEach(async () => {
    await testDbClient('announcements').delete();
  });

  it('should return an empty array when there are no announcements', async () => {
    const announcements = await store.announcements({});
    expect(announcements).toEqual({
      count: 0,
      results: [],
    });
  });
});
