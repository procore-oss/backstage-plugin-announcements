import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
import { initializePersistenceContext } from './service/persistence/persistenceContext';
import { signalsServiceRef } from '@backstage/plugin-signals-node';
import { eventsServiceRef } from '@backstage/plugin-events-node';

export const announcementsPlugin = createBackendPlugin({
  pluginId: 'announcements',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        http: coreServices.httpRouter,
        permissions: coreServices.permissions,
        database: coreServices.database,
        httpAuth: coreServices.httpAuth,
        config: coreServices.rootConfig,
        signals: signalsServiceRef,
        events: eventsServiceRef,
      },
      async init({
        http,
        logger,
        permissions,
        database,
        httpAuth,
        config,
        signals,
        events,
      }) {
        http.use(
          await createRouter({
            permissions,
            logger,
            config,
            persistenceContext: await initializePersistenceContext(database),
            httpAuth,
            signals,
            events,
          }),
        );
      },
    });
  },
});
