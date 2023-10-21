import React from 'react';
import { InfoCard } from '@backstage/core-components';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { Chip, Grid, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';

export const ViewAnnouncementContent = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  return (
    <InfoCard title={announcement.title}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" paragraph>
            Details
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            Publisher: {announcement.publisher} <br />
            Created: {DateTime.fromSQL(announcement.created_at).toRelative()}
          </Typography>
        </Grid>

        {announcement.category && (
          <Grid item xs={12}>
            <Typography variant="h6" align="left" paragraph>
              Categories
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              <Chip label={announcement.category?.title} />
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h6" align="left" paragraph>
            Message
          </Typography>
          <Typography paragraph variant="body1">
            {announcement.body}
          </Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
