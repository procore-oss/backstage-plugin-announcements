---
'@procore-oss/backstage-plugin-announcements-backend': patch
---

Fixes an issue with the announcements count returning the incorrect value when filters are applied.

For example, if there are 2 total announcements in the database, and you request a `max` of 1 announcement, the count would still return 2.

```ts
// before
{
  count: 2,
  announcements: [mostRecentAnnouncement]
}


// after
{
  count: 1,
  announcements: [mostRecentAnnouncement]
}
```
