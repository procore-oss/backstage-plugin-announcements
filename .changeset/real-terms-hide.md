---
'@procore-oss/backstage-plugin-announcements': patch
---

Add `<AnnouncementsContent />` export. This is the underlying component that powers the `AnnouncementsAdminPortal`.

An example of using this directly would be adding it as a tab to the [devtools plugin](https://github.com/backstage/backstage/tree/master/plugins/devtools).

Something like

```tsx
<DevToolsLayout.Route path="announcements" title="Announcements">
  <AnnouncementsContent />
</DevToolsLayout.Route>
```

You can find more details on how this is done with the devtools plugin [here](https://github.com/backstage/backstage/tree/master/plugins/devtools#adding-tabs-from-other-plugins).
