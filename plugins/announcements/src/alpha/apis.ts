import {
  ApiBlueprint,
  createApiFactory,
  discoveryApiRef,
  errorApiRef,
  fetchApiRef,
  identityApiRef,
} from '@backstage/frontend-plugin-api';
import { announcementsApiRef } from '@procore-oss/backstage-plugin-announcements-react';
import { AnnouncementsClient } from '../api';

/**
 * @alpha
 */
export const announcementsApiExtension = ApiBlueprint.make({
  params: {
    factory: createApiFactory({
      api: announcementsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        identityApi: identityApiRef,
        fetchApi: fetchApiRef,
        errorApi: errorApiRef,
      },
      factory: ({ discoveryApi, identityApi, fetchApi, errorApi }) =>
        new AnnouncementsClient({
          discoveryApi,
          identityApi,
          fetchApi,
          errorApi,
        }),
    }),
  },
});
