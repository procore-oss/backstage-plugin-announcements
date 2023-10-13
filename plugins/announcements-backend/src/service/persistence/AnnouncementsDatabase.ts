import {
  Announcement,
  AnnouncementsList,
} from '@procore-oss/backstage-plugin-announcements-common';
import { Knex } from 'knex';
import { DateTime } from 'luxon';

const announcementsTable = 'announcements';

type AnnouncementUpsert = {
  id: string;
  type?: 'info' | 'warning' | 'error';
  category?: string;
  sticky?: boolean;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: DateTime;
};

type DbAnnouncement = {
  id: string;
  type?: 'info' | 'warning' | 'error';
  category?: string;
  sticky?: boolean;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: string;
};

type DbAnnouncementWithCategory = DbAnnouncement & {
  category_slug?: string;
  category_title?: string;
};

type AnnouncementsFilters = {
  max?: number;
  offset?: number;
  category?: string;
};

const announcementUpsertToDB = (
  announcement: AnnouncementUpsert,
): DbAnnouncement => {
  return {
    id: announcement.id,
    type: announcement.type,
    category: announcement.category,
    title: announcement.title,
    sticky: announcement.sticky,
    excerpt: announcement.excerpt,
    body: announcement.body,
    publisher: announcement.publisher,
    created_at: announcement.created_at.toSQL()!,
  };
};

const DBToAnnouncementWithCategory = (
  announcementDb: DbAnnouncementWithCategory,
): Announcement => {
  return {
    id: announcementDb.id,
    type: announcementDb.type,
    category:
      announcementDb.category && announcementDb.category_title
        ? {
            slug: announcementDb.category,
            title: announcementDb.category_title,
          }
        : undefined,
    sticky: announcementDb.sticky,
    title: announcementDb.title,
    excerpt: announcementDb.excerpt,
    body: announcementDb.body,
    publisher: announcementDb.publisher,
    created_at: announcementDb.created_at,
  };
};

export class AnnouncementsDatabase {
  constructor(private readonly db: Knex) {}

  async announcements(
    request: AnnouncementsFilters,
  ): Promise<AnnouncementsList> {
    const countQueryBuilder = this.db<DbAnnouncement>(announcementsTable).count<
      Record<string, number>
    >('id', { as: 'total' });

    if (request.category) {
      countQueryBuilder.where('category', request.category);
    }

    const countResult = await countQueryBuilder.first();

    const queryBuilder = this.db<DbAnnouncementWithCategory>(announcementsTable)
      .select(
        'id',
        'type',
        'publisher',
        'announcements.title',
        'excerpt',
        'body',
        'category',
        'sticky',
        'created_at',
        'categories.title as category_title',
      )
      .orderBy('sticky', 'desc')
      .orderBy('created_at', 'desc')
      .leftJoin('categories', 'announcements.category', 'categories.slug');

    if (request.category) {
      queryBuilder.where('category', request.category);
    }
    if (request.offset) {
      queryBuilder.offset(request.offset);
    }
    if (request.max) {
      queryBuilder.limit(request.max);
    }

    return {
      count: countResult && countResult.total ? countResult.total : 0,
      results: (await queryBuilder.select()).map(DBToAnnouncementWithCategory),
    };
  }

  async announcementByID(id: string): Promise<Announcement | undefined> {
    const dbAnnouncement = await this.db<DbAnnouncementWithCategory>(
      announcementsTable,
    )
      .select(
        'id',
        'type',
        'publisher',
        'announcements.title',
        'excerpt',
        'body',
        'category',
        'sticky',
        'created_at',
        'categories.title as category_title',
      )
      .leftJoin('categories', 'announcements.category', 'categories.slug')
      .where('id', id)
      .first();
    if (!dbAnnouncement) {
      return undefined;
    }

    return DBToAnnouncementWithCategory(dbAnnouncement);
  }

  async deleteAnnouncementByID(id: string): Promise<void> {
    return this.db<DbAnnouncement>(announcementsTable).where('id', id).delete();
  }

  async insertAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<Announcement> {
    await this.db<DbAnnouncement>(announcementsTable).insert(
      announcementUpsertToDB(announcement),
    );

    return (await this.announcementByID(announcement.id))!;
  }

  async updateAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<Announcement> {
    await this.db<DbAnnouncement>(announcementsTable)
      .where('id', announcement.id)
      .update(announcementUpsertToDB(announcement));

    return (await this.announcementByID(announcement.id))!;
  }
}
