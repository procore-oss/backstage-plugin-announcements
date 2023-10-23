import { Readable } from 'stream';
import { Logger } from 'winston';
import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import {
  DocumentCollatorFactory,
  IndexableDocument,
} from '@backstage/plugin-search-common';
import { AnnouncementsClient } from './api';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';

type IndexableAnnouncementDocument = IndexableDocument & {
  excerpt: string;
  createdAt: string;
};

type AnnouncementCollatorOptions = {
  logger: Logger;
  discoveryApi: DiscoveryApi;
  fetchApi: FetchApi;
};

export class AnnouncementCollatorFactory implements DocumentCollatorFactory {
  public readonly type: string = 'announcements';

  private logger: Logger;
  private announcementsClient: AnnouncementsClient;

  static fromConfig(options: AnnouncementCollatorOptions) {
    return new AnnouncementCollatorFactory(options);
  }

  private constructor(options: AnnouncementCollatorOptions) {
    this.logger = options.logger;
    this.announcementsClient = new AnnouncementsClient({
      discoveryApi: options.discoveryApi,
      fetchApi: options.fetchApi,
    });
  }

  async getCollator() {
    return Readable.from(this.execute());
  }

  private async *execute(): AsyncGenerator<IndexableAnnouncementDocument> {
    this.logger.info('indexing announcements');

    const results = await this.announcementsClient.announcements();

    this.logger.debug(`got ${results.length} announcements`);

    for (const result of results) {
      yield this.getDocumentInfo(result);
    }
  }

  private getDocumentInfo(
    announcement: Announcement,
  ): IndexableAnnouncementDocument {
    this.logger.debug(
      `mapping announcement ${announcement.id} to indexable document`,
    );

    return {
      title: announcement.title,
      text: announcement.body,
      excerpt: announcement.excerpt,
      createdAt: announcement.created_at,
      // TODO this might not be correct
      location: `/announcements/view/${announcement.id}`,
    };
  }
}
