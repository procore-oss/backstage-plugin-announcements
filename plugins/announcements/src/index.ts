/**
 * @deprecated
 *
 * We've moved to the new community-maintained repo at `@backstage-community/plugin-announcements`. This
 * package is no longer maintained.
 *
 * To upgrade:
 * 1. Install the new package: `@backstage-community/plugin-announcements`
 * 2. Update your imports to use the new package
 * 3. Uninstall this package: `@procore-oss/backstage-plugin-announcements`
 *
 * The current version is preserved as @backstage-community/plugin-announcements@0.1.1
 */
export * from './plugin';

import {
  announcementsApiRef as announcementsApiRef_,
  AnnouncementsApi as AnnouncementsApi_,
} from '@procore-oss/backstage-plugin-announcements-react';

/**
 * @deprecated Import from `@backstage-community/plugin-announcements-react` for the latest supported version
 */
export type AnnouncementsApi = AnnouncementsApi_;

/**
 * @public
 * @deprecated Import from `@backstage-community/plugin-announcements-react` for the latest supported version
 */
export const announcementsApiRef = announcementsApiRef_;
