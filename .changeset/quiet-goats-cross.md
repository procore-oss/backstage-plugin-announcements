---
'@procore-oss/backstage-plugin-announcements-backend': patch
'@procore-oss/backstage-plugin-announcements-common': patch
---

# Overview

Adds support for the Backstage event system (@backstage/plugin-events-backend).

## Topic

All events are published to the `announcements` topic.

## Event actions

The following event actions are supported

### Announcements

All announcement payloads include the entire contents of the announcement

- 'create_announcement': Create a new announcement
- 'update_announcement': Update an existing announcement
- 'delete_announcement': Delete an existing announcement

### Categories

All category payloads include the category slug.

- 'create_category': Create a new category
- 'delete_category': Delete an existing category

## Subscribing to announcement events example

```ts
import { EVENTS_TOPIC_ANNOUNCEMENTS } from '@procore-oss/backstage-plugin-announcements-common';

events.subscribe({
  id: 'announcements-subscriber',
  topics: [EVENTS_TOPIC_ANNOUNCEMENTS],
  async onEvent(params): Promise<void> {
    console.log('Announcement', params);
  },
});
```
