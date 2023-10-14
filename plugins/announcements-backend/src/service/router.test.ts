import { getVoidLogger } from '@backstage/backend-common';
import express from 'express';
import { DateTime } from 'luxon';
import request from 'supertest';
import { AnnouncementsContext } from './announcementsContextBuilder';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { AnnouncementsDatabase } from './persistence/AnnouncementsDatabase';
import { PersistenceContext } from './persistence/persistenceContext';
import { createRouter } from './router';
import {
  AuthorizeResult,
  PermissionEvaluator,
} from '@backstage/plugin-permission-common';
import { CategoriesDatabase } from './persistence/CategoriesDatabase';

describe('createRouter', () => {
  let app: express.Express;

  const announcementsMock = jest.fn();
  const announcementByIDMock = jest.fn();
  const deleteAnnouncementByIDMock = jest.fn();
  const insertAnnouncementMock = jest.fn();
  const updateAnnouncementMock = jest.fn();

  const categoriesMock = jest.fn();
  const insertCatagoryMock = jest.fn();

  const mockPersistenceContext: PersistenceContext = {
    announcementsStore: {
      announcements: announcementsMock,
      announcementByID: announcementByIDMock,
      deleteAnnouncementByID: deleteAnnouncementByIDMock,
      insertAnnouncement: insertAnnouncementMock,
      updateAnnouncement: updateAnnouncementMock,
    } as unknown as AnnouncementsDatabase,
    categoriesStore: {
      categories: categoriesMock,
      insert: insertCatagoryMock,
    } as unknown as CategoriesDatabase,
  };

  const mockedAuthorize: jest.MockedFunction<PermissionEvaluator['authorize']> =
    jest.fn();

  const mockedPermissionQuery: jest.MockedFunction<
    PermissionEvaluator['authorizeConditional']
  > = jest.fn();

  const permissionEvaluator: PermissionEvaluator = {
    authorize: mockedAuthorize,
    authorizeConditional: mockedPermissionQuery,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    const announcementsContext: AnnouncementsContext = {
      logger: getVoidLogger(),
      persistenceContext: mockPersistenceContext,
      permissions: permissionEvaluator,
    };

    const router = await createRouter(announcementsContext);
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /announcements', () => {
    it('returns ok', async () => {
      announcementsMock.mockReturnValueOnce([
        {
          id: 'uuid',
          title: 'title',
          excerpt: 'excerpt',
          body: 'body',
          publisher: 'user:default/name',
          created_at: DateTime.fromISO('2022-11-02T15:28:08.539Z'),
        },
      ] as any as Announcement[]);

      const response = await request(app).get('/announcements');

      expect(response.status).toEqual(200);
      expect(announcementsMock).toHaveBeenCalledWith({});
      expect(response.body).toEqual([
        {
          id: 'uuid',
          title: 'title',
          excerpt: 'excerpt',
          body: 'body',
          publisher: 'user:default/name',
          created_at: '2022-11-02T15:28:08.539+00:00',
        },
      ]);
    });

    it('returns announcement for a given id', async () => {
      announcementByIDMock.mockReturnValueOnce({
        id: 'uuid2',
        title: 'title2',
        excerpt: 'excerpt2',
        body: 'body2',
        publisher: 'user:default/name2',
        created_at: DateTime.fromISO('2022-11-02T15:28:08.539Z'),
      });

      const response = await request(app).get('/announcements/uuid2');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: 'uuid2',
        title: 'title2',
        excerpt: 'excerpt2',
        body: 'body2',
        publisher: 'user:default/name2',
        created_at: '2022-11-02T15:28:08.539+00:00',
      });
    });

    it('returns announcements for a given category', async () => {
      mockPersistenceContext.categoriesStore.insert({
        slug: 'category',
        title: 'Category',
      });

      mockPersistenceContext.announcementsStore.insertAnnouncement({
        title: 'title',
        excerpt: 'excerpt',
        body: 'without category',
        publisher: 'user:default/name',
        id: 'uuid',
        created_at: DateTime.fromISO('2022-11-02T15:28:08.539Z'),
      });

      mockPersistenceContext.announcementsStore.insertAnnouncement({
        title: 'title',
        category: 'category',
        excerpt: 'excerpt',
        body: 'with category',
        publisher: 'user:default/name',
        id: 'uuid',
        created_at: DateTime.fromISO('2022-11-02T15:28:08.539Z'),
      });

      const response = await request(app).get(
        '/announcements?category=category',
      );

      expect(response.status).toEqual(200);
    });

    it('returns announcements for a provided offset', async () => {
      const response = await request(app).get('/announcements?page=2');

      expect(response.status).toEqual(200);
      expect(announcementsMock).toHaveBeenCalledWith({
        offset: 10,
        category: undefined,
        max: undefined,
        page: undefined,
      });
    });
  });

  describe('POST /announcements', () => {
    it('returns ok', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.ALLOW,
        },
      ]);

      const response = await request(app).post('/announcements').send({
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
      });

      expect(
        mockPersistenceContext.announcementsStore.insertAnnouncement,
      ).toHaveBeenCalledWith({
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
        id: expect.any(String),
        created_at: expect.any(DateTime),
      });

      expect(response.status).toEqual(201);
    });

    it('returns 403 when not authorized', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.DENY,
        },
      ]);

      const response = await request(app).post('/announcements').send({
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
      });

      expect(response.status).toEqual(403);
    });
  });

  describe('PUT /announcements/:id', () => {
    it('returns ok', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.ALLOW,
        },
      ]);

      announcementByIDMock.mockReturnValueOnce({
        id: 'uuid',
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
        created_at: DateTime.fromISO('2022-11-02T15:28:08.539Z'),
      });

      const response = await request(app).put('/announcements/uuid1').send({
        title: 'updatedTitle',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
      });

      expect(
        mockPersistenceContext.announcementsStore.updateAnnouncement,
      ).toHaveBeenCalledWith({
        id: 'uuid',
        title: 'updatedTitle',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
        category: undefined,
        created_at: expect.any(DateTime),
      });

      expect(response.status).toEqual(200);
    });

    it('returns 403 when not authorized', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.DENY,
        },
      ]);

      const response = await request(app).put('/announcements/uuid1').send({
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
      });

      expect(response.status).toEqual(403);
    });

    it('returns 404 when announcement not found', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.ALLOW,
        },
      ]);

      announcementByIDMock.mockReturnValueOnce(undefined);

      const response = await request(app).put('/announcements/uuid2').send({
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'user:default/name',
      });

      expect(response.status).toEqual(404);
    });
  });

  describe('DELETE /announcements/:id', () => {
    it('returns ok', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.ALLOW,
        },
      ]);

      const response = await request(app).delete('/announcements/uuid');

      expect(
        mockPersistenceContext.announcementsStore.deleteAnnouncementByID,
      ).toHaveBeenCalledWith('uuid');

      expect(response.status).toEqual(204);
    });

    it('returns 403 when not authorized', async () => {
      mockedAuthorize.mockResolvedValueOnce([
        {
          result: AuthorizeResult.DENY,
        },
      ]);

      const response = await request(app).delete('/announcements/uuid1');

      expect(response.status).toEqual(403);
    });
  });

  describe('GET /categories', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/categories');

      expect(response.status).toEqual(200);
      expect(categoriesMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /categories', () => {
    it('returns ok', async () => {
      const response = await request(app).post('/categories').send({
        title: 'Title',
      });

      expect(response.status).toEqual(201);
      expect(insertCatagoryMock).toHaveBeenCalledWith({
        slug: 'title',
        title: 'Title',
      });
    });

    it('returns 500 when title is missing', async () => {
      const response = await request(app).post('/categories').send({
        anythingElseButTitle: 'something',
      });

      expect(response.status).toEqual(500);
    });
  });
});
