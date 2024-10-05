---
'@procore-oss/backstage-plugin-announcements-common': patch
'@procore-oss/backstage-plugin-announcements-react': patch
'@procore-oss/backstage-plugin-announcements': patch
---

Adds the ability to filter to only show active announcements

This should not be a breaking change. The `<AnnouncementsPage />` component now accepts an optional `hideInactive` prop that will hide inactive announcements. The default behavior is to show all announcements, or in other words, `hideInactive: false`.

```tsx
 <AnnouncementsPage
  title="Announcements"
  ...
  hideInactive
/>
```
