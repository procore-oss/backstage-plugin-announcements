import { NavItemBlueprint } from '@backstage/frontend-plugin-api';
import { convertLegacyRouteRef } from '@backstage/core-compat-api';
import { rootRouteRef } from '../routes';

// todo: replace once `NavItemBlueprint.make()` supports mui v5
import NotificationsIcon from '@material-ui/icons/Notifications';
// import NotificationsIcon from '@mui/icons-material/Notifications';

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
