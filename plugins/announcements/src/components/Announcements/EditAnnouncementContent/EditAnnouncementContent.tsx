import React from 'react';
import { useAsync } from 'react-use';
import { Content, Progress } from '@backstage/core-components';
import {
  alertApiRef,
  identityApiRef,
  useApi,
  useRouteRefParams,
} from '@backstage/core-plugin-api';
import { Alert } from '@material-ui/lab';
import { announcementEditRouteRef } from '../../../routes';
import { announcementsApiRef, CreateAnnouncementRequest } from '../../../api';
import { AnnouncementForm } from '../AnnouncementForm';
import { SubmitHandler } from 'react-hook-form';
import { AnnouncementFormInputs } from '../AnnouncementForm/AnnouncementForm';

export const EditAnnouncementContent = () => {
  const announcementsApi = useApi(announcementsApiRef);
  const identityApi = useApi(identityApiRef);
  const alertApi = useApi(alertApiRef);
  const { id } = useRouteRefParams(announcementEditRouteRef);
  const { value, loading, error } = useAsync(async () =>
    announcementsApi.announcementByID(id),
  );

  const onSubmit: SubmitHandler<AnnouncementFormInputs> = async formData => {
    const { userEntityRef } = await identityApi.getBackstageIdentity();

    const updatedAnnouncement: CreateAnnouncementRequest = {
      ...formData,
      category: formData.category?.slug,
      publisher: userEntityRef,
    };

    try {
      await announcementsApi.updateAnnouncement(id, updatedAnnouncement);
      alertApi.post({ message: 'Announcement updated.', severity: 'success' });
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  let content;

  if (loading) {
    content = <Progress />;
  } else if (error) {
    content = <Alert severity="error">{error.message}</Alert>;
  } else {
    content = <AnnouncementForm announcement={value} onSubmit={onSubmit} />;
  }

  return <Content>{content}</Content>;
};
