import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Content, Progress } from '@backstage/core-components';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { useApi } from '@backstage/core-plugin-api';
import { Announcement, announcementsApiRef } from '../../../api';
import { AdminAnnouncementList } from '../AdminAnnouncementList';
import { AdminEditAnnouncement } from '../AdminEditAnnouncement';
import { AdminCreateAnnouncement } from '../AdminCreateAnnouncement';

export const AdminPageLayout = ({ allowed }: { allowed: boolean }) => {
  const announcementsApi = useApi(announcementsApiRef);
  const [announcement, setAnnouncement] = React.useState<Announcement>(
    {} as Announcement,
  );

  const [creatingNew, setCreatingNew] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    value: announcementsList,
    loading,
    error,
  } = useAsyncRetry(
    async () => announcementsApi.announcements({}),
    [announcementsApi, isFormSubmitted],
  );

  const handleFormSubmitted = () => {
    setIsFormSubmitted(!isFormSubmitted);
  };

  const handleClick = (next: Announcement) => {
    setCreatingNew(false);
    setAnnouncement(next);
  };

  if (loading || error) {
    return <Progress />;
  }

  return (
    <Content>
      <Grid container>
        <Grid item xs={4}>
          <Button
            disabled={!allowed}
            color="primary"
            variant="contained"
            fullWidth
            style={{
              marginBottom: '10px',
            }}
            onClick={() => {
              setCreatingNew(true);
            }}
          >
            New announcement
          </Button>
          <AdminAnnouncementList
            announcements={announcementsList}
            handleClick={handleClick}
          />
        </Grid>
        <Grid item xs={8}>
          {creatingNew && (
            <AdminCreateAnnouncement
              handleFormSubmitted={handleFormSubmitted}
            />
          )}
          {!creatingNew && (
            <AdminEditAnnouncement
              handleFormSubmitted={handleFormSubmitted}
              id={announcement.id}
            />
          )}
        </Grid>
      </Grid>
    </Content>
  );
};
