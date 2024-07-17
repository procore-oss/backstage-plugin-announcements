export * from './plugin';

import {
  announcementsApiRef as announcementsApiRef_,
  AnnouncementsApi as AnnouncementsApi_,
} from '@clark-associates/backstage-plugin-announcements-react';

/**
 * @deprecated Use `AnnouncementsApi` from `@clark-associates/backstage-plugin-announcements-react` instead
 */
export type AnnouncementsApi = AnnouncementsApi_;

/**
 * @public
 * @deprecated Use `announcementsApiRef` from `@clark-associates/backstage-plugin-announcements-react` instead
 */
export const announcementsApiRef = announcementsApiRef_;
