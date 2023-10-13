import { TestDatabases } from '@backstage/backend-test-utils';
import { AnnouncementsDatabase } from './AnnouncementsDatabase';
import { Knex } from 'knex';
import { initializePersistenceContext } from './persistenceContext';
import { DateTime } from 'luxon';

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

  it('should return an announcement by id', async () => {
    await store.insertAnnouncement({
      id: 'id',
      publisher: 'publisher',
      title: 'title',
      excerpt: 'excerpt',
      body: 'body',
      created_at: DateTime.fromISO('2023-10-13T15:28:08.539'),
    });

    const announcement = await store.announcementByID('id');

    expect(announcement).toEqual({
      id: 'id',
      publisher: 'publisher',
      title: 'title',
      excerpt: 'excerpt',
      body: 'body',
      category: undefined,
      sticky: null,
      type: null,
      created_at: '2023-10-13 15:28:08.539 +00:00',
    });
  });

  it('should insert a new announcement', async () => {
    await store.insertAnnouncement({
      id: 'id',
      publisher: 'publisher',
      title: 'title',
      excerpt: 'excerpt',
      body: 'body',
      created_at: DateTime.fromISO('2023-10-13T15:28:08.539'),
    });

    const announcements = await store.announcements({});

    expect(announcements).toEqual({
      count: 1,
      results: [
        {
          id: 'id',
          publisher: 'publisher',
          title: 'title',
          excerpt: 'excerpt',
          body: 'body',
          category: undefined,
          sticky: null,
          type: null,
          created_at: '2023-10-13 15:28:08.539 +00:00',
        },
      ],
    });
  });

  it('should update an existing announcement', async () => {
    await store.insertAnnouncement({
      id: 'id',
      publisher: 'publisher',
      title: 'title',
      excerpt: 'excerpt',
      body: 'body',
      created_at: DateTime.fromISO('2023-10-13T15:28:08.539'),
    });

    await store.updateAnnouncement({
      id: 'id',
      publisher: 'publisher',
      title: 'title2',
      excerpt: 'excerpt2',
      body: 'body2',
      created_at: DateTime.fromISO('2023-10-13T15:28:08.539'),
    });

    const announcements = await store.announcements({});

    expect(announcements).toEqual({
      count: 1,
      results: [
        {
          id: 'id',
          publisher: 'publisher',
          title: 'title2',
          excerpt: 'excerpt2',
          body: 'body2',
          category: undefined,
          sticky: null,
          type: null,
          created_at: '2023-10-13 15:28:08.539 +00:00',
        },
      ],
    });
  });

  it('should delete an existing announcement', async () => {
    await store.insertAnnouncement({
      id: 'id',
      publisher: 'publisher',
      title: 'title',
      excerpt: 'excerpt',
      body: 'body',
      created_at: DateTime.fromISO('2023-10-13T15:28:08.539'),
    });

    expect((await store.announcements({})).count).toBe(1);

    await store.deleteAnnouncementByID('id');

    const announcements = await store.announcements({});

    expect(announcements).toEqual({
      count: 0,
      results: [],
    });
  });
});
