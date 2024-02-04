import { Category } from '@procore-oss/backstage-plugin-announcements-common';
import { DateTime } from 'luxon';

export type Announcement = {
  id: string;
  category?: Category;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: DateTime;
};
