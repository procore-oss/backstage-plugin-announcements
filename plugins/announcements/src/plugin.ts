import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  errorApiRef,
  fetchApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { createCardExtension } from '@backstage/plugin-home-react';
import {
  createSearchResultListItemExtension,
  SearchResultListItemExtensionProps,
} from '@backstage/plugin-search-react';
import { announcementsApiRef } from '@procore-oss/backstage-plugin-announcements-react';
import { AnnouncementsClient } from './api';
import { AnnouncementsCardOpts } from './components/AnnouncementsCard/Content';
import { AnnouncementSearchResultProps } from './components/AnnouncementSearchResultListItem';
import { rootRouteRef } from './routes';

export const announcementsPlugin = createPlugin({
  id: 'announcements',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: announcementsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
        errorApi: errorApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, identityApi, errorApi, fetchApi }) => {
        return new AnnouncementsClient({
          discoveryApi: discoveryApi,
          identityApi: identityApi,
          errorApi: errorApi,
          fetchApi: fetchApi,
        });
      },
    }),
  ],
});

export const AnnouncementsPage = announcementsPlugin.provide(
  createRoutableExtension({
    name: 'AnnouncementsPage',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

export const AnnouncementsAdminPortal = announcementsPlugin.provide(
  createRoutableExtension({
    name: 'AnnouncementsAdminPortal',
    component: () => import('./components/Admin').then(m => m.AdminPortal),
    mountPoint: rootRouteRef,
  }),
);

export const AnnouncementsTimeline = announcementsPlugin.provide(
  createComponentExtension({
    name: 'AnnouncementsTimeline',
    component: {
      lazy: () => import('./components').then(m => m.AnnouncementsTimeline),
    },
  }),
);

export const AnnouncementsCard = announcementsPlugin.provide(
  createCardExtension<AnnouncementsCardOpts>({
    name: 'AnnouncementsCard',
    title: 'Announcements',
    components: () => import('./components/AnnouncementsCard'),
  }),
);

export const NewAnnouncementBanner = announcementsPlugin.provide(
  createComponentExtension({
    name: 'NewAnnouncementBanner',
    component: {
      lazy: () =>
        import('./components/NewAnnouncementBanner').then(
          m => m.NewAnnouncementBanner,
        ),
    },
  }),
);

export const AnnouncementSearchResultListItem: (
  props: SearchResultListItemExtensionProps<AnnouncementSearchResultProps>,
) => JSX.Element | null = announcementsPlugin.provide(
  createSearchResultListItemExtension({
    name: 'AnnouncementSearchResultListItem',
    component: () =>
      import('./components/AnnouncementSearchResultListItem').then(
        m => m.AnnouncementSearchResultListItem,
      ),
    predicate: result => result.type === 'announcements',
  }),
);
