import { Content, ContentHeader, InfoCard } from '@backstage/core-components';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Container,
  makeStyles,
} from '@material-ui/core';
import { AnnouncementsListFe } from '@procore-oss/backstage-plugin-announcements-common';
import React from 'react';

const useStyles = makeStyles({
  feedContainer: {
    margin: 'auto',
    height: '80vh',
    maxHeight: '80vh',
    overflow: 'scroll',
  },
  announcementCard: {
    marginBottom: '25px',
    borderRadius: '16px',
  },
});

export const Newsfeed = ({
  announcements,
}: {
  announcements: AnnouncementsListFe;
}) => {
  const classes = useStyles();
  if (announcements.count === 0) {
    return (
      <InfoCard title="Newsfeed">
        <Content>
          <Typography variant="h3">No announcements to display.</Typography>
        </Content>
      </InfoCard>
    );
  }

  return (
    <Container maxWidth="md">
      <Content className={classes.feedContainer}>
        <ContentHeader title="Newsfeed" />
        <Grid container>
          <Grid item style={{ width: '100%' }}>
            {announcements.results.map(announcement => {
              return (
                <Card
                  variant="outlined"
                  key={announcement.id}
                  className={classes.announcementCard}
                >
                  <CardContent>
                    <Typography variant="h6">{announcement.title}</Typography>
                    <Typography variant="body1">{announcement.body}</Typography>
                    <Typography variant="body1">
                      {announcement.category?.title}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};
