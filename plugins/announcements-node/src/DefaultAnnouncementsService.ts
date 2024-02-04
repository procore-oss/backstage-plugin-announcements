import {
  Announcement,
  AnnouncementsList,
} from '@procore-oss/backstage-plugin-announcements-common';
import { AnnouncementsService } from './AnnouncementsService';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';

type AnnouncementsServiceOptions = {
  discoveryApi: DiscoveryApi;
};

export class DefaultAnnouncementsService implements AnnouncementsService {
  private readonly discoveryApi: DiscoveryApi;

  static create(opts: AnnouncementsServiceOptions) {
    return new DefaultAnnouncementsService(opts);
  }

  constructor(opts: AnnouncementsServiceOptions) {
    this.discoveryApi = opts.discoveryApi;
  }

  private async fetch<T = any>(input: string): Promise<T> {
    const baseApiUrl = await this.discoveryApi.getBaseUrl('announcements');

    return fetch(`${baseApiUrl}${input}`).then(async response => {
      if (!response.ok) {
        throw await ResponseError.fromResponse(response);
      }
      return response.json() as Promise<T>;
    });
  }

  async announcements(): Promise<Announcement[]> {
    const { results } = await this.fetch<AnnouncementsList>('/announcements');
    return results;
  }
}
