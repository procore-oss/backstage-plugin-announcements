import { MockFetchApi, setupRequestMockHandlers } from '@backstage/test-utils';
import { AnnouncementsClient } from './api';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('AnnouncementsClient', () => {
  const server = setupServer();
  const mockBaseUrl = 'http://localhost:7007/api/';
  const discoveryApi = { getBaseUrl: async () => mockBaseUrl };

  setupRequestMockHandlers(server);
  const fetchApi = new MockFetchApi();

  let client: AnnouncementsClient;
  beforeEach(() => {
    client = new AnnouncementsClient({ discoveryApi, fetchApi });
    server.listen();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('handles no announcements', async () => {
    server.use(
      rest.get(`${mockBaseUrl}/announcements`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ count: 0, results: [] })),
      ),
    );
    expect(await client.announcements()).toEqual([]);
  });

  it('returns announcements', async () => {
    const announcements = [
      {
        id: '1',
        title: 'announcement1',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'publisher',
        created_at: '2021-01-01T00:00:00Z',
      },
      {
        id: '1',
        title: 'announcement2',
        excerpt: 'excerpt',
        body: 'body',
        publisher: 'publisher2',
        created_at: '2021-01-02T00:00:00Z',
      },
    ];
    server.use(
      rest.get(`${mockBaseUrl}/announcements`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ count: 2, results: announcements })),
      ),
    );
    expect(await client.announcements()).toEqual(announcements);
  });

  it('throws on error', async () => {
    server.use(
      rest.get(`${mockBaseUrl}/announcements`, (_, res, ctx) =>
        res(ctx.status(500)),
      ),
    );
    await expect(client.announcements()).rejects.toThrow(
      'Request failed with 500 Error',
    );
  });
});
