import React, { useState } from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { AnnouncementList } from '../../AnnouncementList';
import {
  Content,
  ContentHeader,
  Header,
  Progress,
} from '@backstage/core-components';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { CreateAnnouncementRequest, announcementsApiRef } from '../../../api';
import {
  alertApiRef,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { SubmitHandler } from 'react-hook-form';
import {
  AnnouncementForm,
  AnnouncementFormInputs,
} from '../../Announcements/AnnouncementForm/AnnouncementForm';
import { ViewAnnouncementContent } from '../../Announcements/ViewAnnouncementContent';
import { ContextMenu } from '../../AnnouncementsPage/ContextMenu';

export const AdminPageLayout = () => {
  const announcementsApi = useApi(announcementsApiRef);
  const identityApi = useApi(identityApiRef);
  const alertApi = useApi(alertApiRef);
  const [announcement, setAnnouncement] = React.useState<Announcement>(
    {} as Announcement,
  );

  const [creatingNew, isCreatingNew] = useState(true);

  const {
    value: announcementsList,
    loading,
    error,
  } = useAsyncRetry(
    async () => announcementsApi.announcements({}),
    [announcementsApi],
  );

  if (loading || error) {
    return <Progress />;
  }

  const handleClick = async (next: Announcement) => {
    isCreatingNew(false);
    const selected = await announcementsApi.announcementByID(next.id);
    setAnnouncement(selected);
  };

  const onSubmit: SubmitHandler<AnnouncementFormInputs> = async formData => {
    isCreatingNew(false);
    const { userEntityRef } = await identityApi.getBackstageIdentity();

    const newAnnouncement: CreateAnnouncementRequest = {
      ...formData,
      category: formData.category?.slug,
      publisher: userEntityRef,
    };
    await announcementsApi.createAnnouncement(newAnnouncement);
    alertApi.post({ message: 'Announcement created', severity: 'success' });
  };

  return (
    <>
      <Header title="Admin">
        <ContextMenu />
      </Header>
      <Content>
        <Grid container>
          <Grid item xs={4}>
            <Button
              onClick={() => {
                isCreatingNew(true);
              }}
              color="primary"
              variant="contained"
              fullWidth
              style={{
                marginBottom: '10px',
              }}
            >
              New announcement
            </Button>
            <AnnouncementList
              announcements={announcementsList}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={8}>
            {creatingNew && (
              <Paper elevation={2}>
                <Content>
                  <ContentHeader title="New Announcement" />
                  <AnnouncementForm
                    announcement={{} as Announcement}
                    onSubmit={onSubmit}
                  />
                </Content>
              </Paper>
            )}

            {!creatingNew && (
              <ViewAnnouncementContent announcement={announcement} />
            )}
          </Grid>
        </Grid>
      </Content>
    </>
  );
};
