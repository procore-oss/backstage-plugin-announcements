import React from 'react';
import { createEntityCardExtension } from '@backstage/plugin-catalog-react/alpha';
import { ExtensionDefinition } from '@backstage/frontend-plugin-api';

/**
 * @alpha
 */
export const entityAnnouncementsCard = createEntityCardExtension({
  name: 'announcements',
  loader: () =>
    import('../components/AnnouncementsCard').then(m => (
      <m.AnnouncementsCard />
    )),
}) as ExtensionDefinition<{ filter?: string }>;
