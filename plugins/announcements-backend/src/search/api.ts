import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import {
  Announcement,
  AnnouncementsList,
} from '@procore-oss/backstage-plugin-announcements-common';

export class AnnouncementsClient {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(opts: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = opts.discoveryApi;
    this.fetchApi = opts.fetchApi;
  }

  private async fetch<T = any>(input: string): Promise<T> {
    const baseApiUrl = await this.discoveryApi.getBaseUrl('announcements');

    return this.fetchApi.fetch(`${baseApiUrl}${input}`).then(async response => {
      if (!response.ok) {
        throw await ResponseError.fromResponse(response);
      }
      return response.json() as Promise<T>;
    });
  }

  async announcements(): Promise<Announcement[]> {
    const result = await this.fetch<AnnouncementsList>('/announcements');
    return result?.results;
  }
}
