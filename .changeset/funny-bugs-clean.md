---
'@procore-oss/backstage-plugin-announcements-react': patch
'@procore-oss/backstage-plugin-announcements': patch
---

Added two new hooks (useAnnouncements and useCategories) to refactor out some repetive calls to the announcementsApi on the frontend.

While not the primary objective, these will be exported from '@procore-oss/backstage-plugin-announcements-react' so adopters _could_ retrieve announcements and display them as they see fit. 
