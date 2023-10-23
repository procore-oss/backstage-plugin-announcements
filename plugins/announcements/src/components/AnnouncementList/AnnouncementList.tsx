import React from 'react';
import { InfoCard } from '@backstage/core-components';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  Announcement,
  AnnouncementsList,
} from '@procore-oss/backstage-plugin-announcements-common';

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
    <ListItem
      alignItems="flex-start"
      key={announcement.id}
      button
      onClick={async () => handleClick(announcement)}
    >
      <ListItemText
        primary={announcement.title}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2">
              {announcement.publisher}
            </Typography>
            <Typography variant="body2">{announcement.excerpt}</Typography>

            {/* TODO: No need to delete. Add this back when working on the editing view */}
            {/* <ListItemSecondaryAction>
              <Button
                type="button"
                onClick={async () => handleClick(announcement)}
              >
                <EditIcon />
              </Button>
            </ListItemSecondaryAction> */}
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
