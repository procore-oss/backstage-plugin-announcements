import React from 'react';
import { InfoCard, LinkButton } from '@backstage/core-components';
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  Announcement,
  AnnouncementsList,
} from '@procore-oss/backstage-plugin-announcements-common';
import { useRouteRef } from '@backstage/core-plugin-api';
import { announcementEditRouteRef } from '../../routes';
import EditIcon from '@material-ui/icons/Edit';

export const AnnouncementList = ({
  announcements,
  handleClick,
}: {
  announcements: AnnouncementsList | undefined;
  handleClick: (next: Announcement) => void;
}) => {
  if (!announcements) {
    return (
      <InfoCard title="Announcements">
        <List>
          <Typography variant="body2">
            There are no announcements to display.
          </Typography>
        </List>
      </InfoCard>
    );
  }

  const items = announcements.results.map(announcement => (
    <ListItem alignItems="flex-start" key={announcement.id}>
      <ListItemText
        primary={announcement.title}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2">
              {announcement.publisher}
            </Typography>
            <Typography variant="body2">{announcement.excerpt}</Typography>

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="update">
                <Button
                  type="button"
                  onClick={async () => handleClick(announcement)}
                >
                  <EditIcon />
                </Button>
              </IconButton>
            </ListItemSecondaryAction>
          </React.Fragment>
        }
      />
      <Divider variant="inset" component="li" />
    </ListItem>
  ));

  return (
    <InfoCard title="Announcements">
      <List dense style={{ overflowY: 'scroll', maxHeight: '650px' }}>
        {items}
      </List>
    </InfoCard>
  );
};
