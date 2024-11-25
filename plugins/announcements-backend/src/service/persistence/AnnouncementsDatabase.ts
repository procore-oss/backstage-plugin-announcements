import { Knex } from 'knex';
import { DateTime } from 'luxon';
import { AnnouncementModel } from '../model';
import {
  AnnouncementsFilters,
  Announcement,
} from '@procore-oss/backstage-plugin-announcements-common';
import slugify from 'slugify';

const announcementsTable = 'announcements';

type AnnouncementUpsert = Omit<Announcement, 'category' | 'created_at'> & {
  category?: string;
  created_at: DateTime;
};

type DbAnnouncement = Omit<Announcement, 'category'> & {
  category?: string;
};

type DbAnnouncementWithCategory = DbAnnouncement & {
  category_slug?: string;
  category_title?: string;
};

type AnnouncementModelsList = {
  count: number;
  results: AnnouncementModel[];
};

export const timestampToDateTime = (input: Date | string): DateTime => {
  if (typeof input === 'object') {
    return DateTime.fromJSDate(input).toUTC();
  }

  const result = input.includes(' ')
    ? DateTime.fromSQL(input, { zone: 'utc' })
    : DateTime.fromISO(input, { zone: 'utc' });
  if (!result.isValid) {
    throw new TypeError('Not valid');
  }

  return result;
};

const announcementUpsertToDB = (
  announcement: AnnouncementUpsert,
): DbAnnouncement => {
  return {
    id: announcement.id,
    category: announcement.category
      ? slugify(announcement.category, {
          lower: true,
        })
      : announcement.category,
    title: announcement.title,
    excerpt: announcement.excerpt,
    body: announcement.body,
    publisher: announcement.publisher,
    created_at: announcement.created_at.toSQL()!,
    active: announcement.active,
  };
};

const DBToAnnouncementWithCategory = (
  announcementDb: DbAnnouncementWithCategory,
): AnnouncementModel => {
  return {
    id: announcementDb.id,
    category:
      announcementDb.category && announcementDb.category_title
        ? {
            slug: announcementDb.category,
            title: announcementDb.category_title,
          }
        : undefined,
    title: announcementDb.title,
    excerpt: announcementDb.excerpt,
    body: announcementDb.body,
    publisher: announcementDb.publisher,
    created_at: timestampToDateTime(announcementDb.created_at),
    active: announcementDb.active,
  };
};

export class AnnouncementsDatabase {
  constructor(private readonly db: Knex) {}

  async announcements(
    request: AnnouncementsFilters,
  ): Promise<AnnouncementModelsList> {
    const { category, offset, max, active } = request;

    // Filter the query by states
    // Used for both the result query and the count query
    const filterState = <TRecord extends {}, TResult>(
      qb: Knex.QueryBuilder<TRecord, TResult>,
    ) => {
      if (category) {
        qb.where('category', category);
      }
      if (active) {
        qb.where('active', active);
      }
    };

    // Filter the page (offset + max). Used only for the result query
    const filterRange = <TRecord extends {}, TResult>(
      qb: Knex.QueryBuilder<TRecord, TResult>,
    ) => {
      if (offset) {
        qb.offset(offset);
      }
      if (max) {
        qb.limit(max);
      }
    };

    const queryBuilder = this.db<DbAnnouncementWithCategory>(announcementsTable)
      .select(
        'id',
        'publisher',
        'announcements.title',
        'excerpt',
        'body',
        'category',
        'created_at',
        'categories.title as category_title',
        'active',
      )
      .orderBy('created_at', 'desc')
      .leftJoin('categories', 'announcements.category', 'categories.slug');
    filterState(queryBuilder);
    filterRange(queryBuilder);
    const results = (await queryBuilder.select()).map(
      DBToAnnouncementWithCategory,
    );

    const countQueryBuilder = this.db<DbAnnouncement>(announcementsTable).count<
      Record<string, number>
    >('id', { as: 'total' });
    filterState(countQueryBuilder);
    const countResult = await countQueryBuilder.first();
    const count =
      countResult && countResult.total
        ? parseInt(countResult.total.toString(), 10)
        : 0;

    return {
      count,
      results,
    };
  }

  async announcementByID(id: string): Promise<AnnouncementModel | undefined> {
    const dbAnnouncement: DbAnnouncementWithCategory =
      await this.db<DbAnnouncementWithCategory>(announcementsTable)
        .select(
          'id',
          'publisher',
          'announcements.title',
          'excerpt',
          'body',
          'category',
          'created_at',
          'categories.title as category_title',
          'active',
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
  ): Promise<AnnouncementModel> {
    await this.db<DbAnnouncement>(announcementsTable).insert(
      announcementUpsertToDB(announcement),
    );

    const newAnnouncement = await this.announcementByID(announcement.id);

    if (!newAnnouncement) {
      throw new Error('Failed to insert announcement');
    }

    return newAnnouncement;
  }

  async updateAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<AnnouncementModel> {
    await this.db<DbAnnouncement>(announcementsTable)
      .where('id', announcement.id)
      .update(announcementUpsertToDB(announcement));

    return (await this.announcementByID(announcement.id))!;
  }
}
