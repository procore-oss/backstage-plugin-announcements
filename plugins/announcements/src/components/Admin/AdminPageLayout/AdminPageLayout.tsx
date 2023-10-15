import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { AnnouncementList } from '../../AnnouncementList';
import { Content, Header, Progress } from '@backstage/core-components';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import { CreateAnnouncementRequest, announcementsApiRef } from '../../../api';
import {
  alertApiRef,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { AnnouncementForm } from '../../Announcements';
import { SubmitHandler } from 'react-hook-form';
import { AnnouncementFormInputs } from '../../Announcements/AnnouncementForm/AnnouncementForm';

export const AdminPageLayout = () => {
  const announcementsApi = useApi(announcementsApiRef);
  const identityApi = useApi(identityApiRef);
  const alertApi = useApi(alertApiRef);
  const [announcement, setAnnouncement] = React.useState<Announcement>(
    {} as Announcement,
  );

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
    const selected = await announcementsApi.announcementByID(next.id);
    setAnnouncement(selected);
  };

  const onSubmit: SubmitHandler<AnnouncementFormInputs> = async formData => {
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
      <Header title="Admin" />
      <Content>
        <Grid container>
          <Grid item xs={4}>
            <Button
              onClick={() => {
                setAnnouncement({} as Announcement);
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
            <AnnouncementForm announcement={announcement} onSubmit={onSubmit} />
          </Grid>
        </Grid>
      </Content>
    </>
  );
};
