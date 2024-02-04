export * from './service/router';
export { AnnouncementsClient } from './api';
export { announcementsPlugin as default } from './plugin';
export { buildAnnouncementsContext } from './service/announcementsContextBuilder';

import { AnnouncementCollatorFactory as AnnouncementCollatorFactory_ } from '@procore-oss/backstage-plugin-search-backend-module-announcements';

/**
 * @public
 * @deprecated Use `AnnouncementCollatorFactory` from `@procore-oss/backstage-plugin-search-backend-module-announcements` instead
 */
export type AnnouncementCollatorFactory = AnnouncementCollatorFactory_;
