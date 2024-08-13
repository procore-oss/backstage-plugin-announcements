import { AnnouncementsFilters } from '@clark-associates/backstage-plugin-announcements-common';
import { AnnouncementModel } from '../model';
import {
  AnnouncementModelsList,
  AnnouncementsDatabase,
  AnnouncementUpsert,
} from './AnnouncementsDatabase';
import { CategoriesDatabase } from './CategoriesDatabase';
import { IAnnouncementsDatabase } from './IAnnouncementsDatabase';
import {
  PersistenceContext,
  initializePersistenceContext,
} from './persistenceContext';
import { TestDatabases } from '@backstage/backend-test-utils';

class TestAnnouncementsDatabase implements IAnnouncementsDatabase {
  announcements(
    request: AnnouncementsFilters,
  ): Promise<AnnouncementModelsList> {
    throw new Error('Method not implemented.');
  }
  announcementByID(id: string): Promise<AnnouncementModel | undefined> {
    throw new Error('Method not implemented.');
  }
  deleteAnnouncementByID(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  insertAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<AnnouncementModel> {
    throw new Error('Method not implemented.');
  }
  updateAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<AnnouncementModel> {
    throw new Error('Method not implemented.');
  }
}

describe('initializePersistenceContext', () => {
  const databases = TestDatabases.create();
  const dbClient = databases.init('SQLITE_3');
  const mockedDb = {
    getClient: async () => dbClient,
    migrations: {
      skip: false,
    },
  };

  let context: PersistenceContext;

  beforeEach(async () => {
    context = await initializePersistenceContext(mockedDb, undefined);
  });

  it('initializes default announcements store', async () => {
    expect(context.announcementsStore).toBeInstanceOf(AnnouncementsDatabase);
  });

  it('initializes the categories store', async () => {
    expect(context.categoriesStore).toBeInstanceOf(CategoriesDatabase);
  });

  it('initializes specified announcemeents store', async () => {
    const testAnnouncemntsDatabase = new TestAnnouncementsDatabase();

    const testContext = await initializePersistenceContext(
      mockedDb,
      testAnnouncemntsDatabase,
    );

    expect(testContext.announcementsStore).toBeInstanceOf(
      TestAnnouncementsDatabase,
    );
  });
});
