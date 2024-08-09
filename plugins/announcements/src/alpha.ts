import { convertLegacyRouteRefs } from '@backstage/core-compat-api';
import { BackstagePlugin, createPlugin } from '@backstage/frontend-plugin-api';
import { rootRouteRef } from './routes';

/**
 * @alpha
 */
export default createPlugin({
  id: 'announcements',
  routes: convertLegacyRouteRefs({
    root: rootRouteRef,
  }),
}) as BackstagePlugin;
