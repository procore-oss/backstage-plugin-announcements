---
'@procore-oss/backstage-plugin-search-backend-module-announcements': patch
'@procore-oss/backstage-plugin-announcements-backend': patch
---

Export collators from search backend module and deprecate the collators coming from `announcements-backend`. Users are recommended to update their imports to use `@procore-oss/backstage-plugin-search-backend-module-announcements`.
