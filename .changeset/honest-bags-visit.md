---
'@procore-oss/backstage-plugin-announcements': patch
---

Migrate to `announcementsApiRef` and `AnnouncementApi` interface from `@procore-oss/backstage-plugin-announcements-react` and mark existing exports as deprecated.

Users should now import both `announcementsApiRef` and `AnnouncementApi` from `@procore-oss/backstage-plugin-announcements-react`. Existing exports will be removed in a future release.
