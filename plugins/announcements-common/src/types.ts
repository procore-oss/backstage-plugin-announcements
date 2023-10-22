import { DateTime } from 'luxon';

export type Category = {
  slug: string;
  title: string;
};

export type AnnouncementsList = {
  count: number;
  results: Announcement[];
};

export type Announcement = {
  id: string;
  category?: Category;
  sticky?: boolean;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: DateTime;
};

export type DbAnnouncement = {
  id: string;
  category?: string; // category slug
  sticky?: boolean;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: string;
};

export type DbAnnouncementWithCategory = DbAnnouncement & {
  category_slug?: string;
  category_title?: string;
};
