/**
 * @deprecated
 *
 * We've moved to the new community-maintained repo at `@backstage-community/plugin-announcements-backend`.
 * This package is no longer maintained.
 *
 * To upgrade:
 * 1. Install the new package: `@backstage-community/plugin-announcements-backend`
 * 2. Update your imports to use the new package
 * 3. Uninstall this package: `@procore-oss/backstage-plugin-announcements-backend`
 *
 * The current version is preserved as @backstage-community/plugin-announcements-backend@0.1.1
 */
export { announcementsPlugin as default } from './plugin';

export * from './service/router';
export { buildAnnouncementsContext } from './service/announcementsContextBuilder';

import { AnnouncementCollatorFactory as AnnouncementCollatorFactory_ } from '@procore-oss/backstage-plugin-search-backend-module-announcements';

/**
 * @public
 * @deprecated Use `AnnouncementCollatorFactory` from `@backstage-community/plugin-search-backend-module-announcements` instead
 */
export type AnnouncementCollatorFactory = AnnouncementCollatorFactory_;
