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
