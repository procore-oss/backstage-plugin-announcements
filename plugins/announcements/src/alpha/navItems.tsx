import { NavItemBlueprint } from '@backstage/frontend-plugin-api';
import { convertLegacyRouteRef } from '@backstage/core-compat-api';
import { rootRouteRef } from '../routes';
import NotificationsIcon from '@material-ui/icons/Notifications';

/**
 * @alpha
 */
export const announcementsNavItem = NavItemBlueprint.make({
  params: {
    title: 'Announcements',
    routeRef: convertLegacyRouteRef(rootRouteRef),
    icon: NotificationsIcon,
  },
});

export default [announcementsNavItem];
