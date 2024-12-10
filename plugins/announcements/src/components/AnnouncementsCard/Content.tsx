import { Link, Progress } from '@backstage/core-components';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { usePermission } from '@backstage/plugin-permission-react';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import { announcementEntityPermissions } from '@procore-oss/backstage-plugin-announcements-common';
import {
  announcementsApiRef,
  useAnnouncements,
  useAnnouncementsTranslation,
} from '@procore-oss/backstage-plugin-announcements-react';
import { DateTime } from 'luxon';
import React from 'react';
import {
  announcementCreateRouteRef,
  announcementViewRouteRef,
  rootRouteRef,
} from '../../routes';

const useStyles = makeStyles({
  newAnnouncementIcon: {
    minWidth: '36px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export type AnnouncementsCardOpts = {
  max?: number;
  category?: string;
  active?: boolean;
};

export const Content = ({ max, category, active }: AnnouncementsCardOpts) => {
  const classes = useStyles();
  const announcementsApi = useApi(announcementsApiRef);
  const announcementsLink = useRouteRef(rootRouteRef);
  const viewAnnouncementLink = useRouteRef(announcementViewRouteRef);
  const createAnnouncementLink = useRouteRef(announcementCreateRouteRef);
  const lastSeen = announcementsApi.lastSeenDate();
  const { t } = useAnnouncementsTranslation();

  const { announcements, loading, error } = useAnnouncements({
    max: max || 5,
    category,
    active,
  });

  const { announcementCreatePermission } = announcementEntityPermissions;
  const { loading: loadingPermission, allowed: canAdd } = usePermission({
    permission: announcementCreatePermission,
  });

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <>
      <List dense>
        {announcements.results.map(announcement => (
          <ListItem key={announcement.id}>
            <ListItem>
              {lastSeen < DateTime.fromISO(announcement.created_at) && (
                <ListItemIcon
                  className={classes.newAnnouncementIcon}
                  title={t('announcementsCard.new')}
                >
                  <NewReleasesIcon />
                </ListItemIcon>
              )}

              <ListItemText
                primary={
                  <Link to={viewAnnouncementLink({ id: announcement.id })}>
                    {announcement.title}
                  </Link>
                }
                secondary={
                  <>
                    {DateTime.fromISO(announcement.created_at).toRelative()}
                    {announcement.category && (
                      <>
                        {` ${t('announcementsCard.in')} `}
                        <Link
                          to={`${announcementsLink()}?category=${
                            announcement.category.slug
                          }`}
                        >
                          {announcement.category.title}
                        </Link>
                      </>
                    )}{' '}
                    – {announcement.excerpt}
                  </>
                }
              />
            </ListItem>
          </ListItem>
        ))}
        {announcements.count === 0 && !loadingPermission && canAdd && (
          <ListItem>
            <ListItemText>
              {`${t('announcementsCard.noAnnouncements')} `}
              <Link to={createAnnouncementLink()}>
                {t('announcementsCard.addOne')}
              </Link>
              ?
            </ListItemText>
          </ListItem>
        )}
      </List>

      <Box className={classes.buttonWrapper}>
        <Button href={announcementsLink()}>
          {t('announcementsCard.seeAll')}
        </Button>
      </Box>
    </>
  );
};
