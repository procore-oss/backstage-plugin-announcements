import React from 'react';
import { convertLegacyRouteRef } from '@backstage/core-compat-api';
import { createPageExtension } from '@backstage/frontend-plugin-api';
import { rootRouteRef } from '../routes';

export const announcementsPage = createPageExtension({
  defaultPath: '/announcements',
  routeRef: convertLegacyRouteRef(rootRouteRef),
  loader: async () => {
    const { AnnouncementsPage } = await import(
      '../components/AnnouncementsPage'
    );
    return <AnnouncementsPage title="Announcements" themeId="app" />;
  },
});
