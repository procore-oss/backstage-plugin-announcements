---
'@procore-oss/backstage-plugin-announcements': patch
---

fix: `AdminPortal` was not available for export.

Taking the opportunity to update `AdminPortal` to `AnnouncementsAdminPortal` and make available for export

```tsx
  import { AnnouncementsAdminPortal } from '@procore-oss/backstage-plugin-announcements';

  // default
  <AnnouncementsAdminPortal />

  // supports optional props
  <AnnouncementsAdminPortal
    title='my title'
    subtitle='my subtitle'
    themeId='my theme'
  >
```
