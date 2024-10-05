---
'@procore-oss/backstage-plugin-announcements': patch
---

Add the ability to hide the context menu via a `hideContextMenu` boolean property.

The menu to access creating categories now includes a link to access the admin portal. However, the menu appears by default on the announcements page, and you may not want it visible to end users. Permissions are in place once a user lands on the admin portal, but it would be better to hide the menu altogether.
