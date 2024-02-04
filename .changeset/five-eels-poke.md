---
'@procore-oss/backstage-plugin-search-backend-module-announcements': patch
---

Refactor the AnnouncementsCollatorFactory to use the service coming from the new `announcements-node` package. This removes the modules dependency on `announcements-backend` which we ultimately don't want.
