export * from './plugin';

import {
  announcementsApiRef as announcementsApiRef_,
  AnnouncementsApi as AnnouncementsApi_,
  translationRef as translationRef_,
} from '@procore-oss/backstage-plugin-announcements-react';

/**
 * @deprecated Use `AnnouncementsApi` from `@procore-oss/backstage-plugin-announcements-react` instead
 */
export type AnnouncementsApi = AnnouncementsApi_;

/**
 * @public
 * @deprecated Use `announcementsApiRef` from `@procore-oss/backstage-plugin-announcements-react` instead
 */
export const announcementsApiRef = announcementsApiRef_;

/**
 * @public
 */
export const announcementsTranslationRef = translationRef_;
