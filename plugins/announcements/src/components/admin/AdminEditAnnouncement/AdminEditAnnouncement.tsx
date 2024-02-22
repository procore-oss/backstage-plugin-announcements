import React from 'react';
import { useAsync } from 'react-use';
import { Progress } from '@backstage/core-components';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { Alert } from '@material-ui/lab';
import { AnnouncementForm } from '../../AnnouncementForm';
import { announcementsApiRef, CreateAnnouncementRequest } from '../../../api';

export const AdminEditAnnouncement = ({
  id,
  handleFormSubmitted,
}: {
  id: string;
  handleFormSubmitted: () => void;
}) => {
  const announcementsApi = useApi(announcementsApiRef);
  const alertApi = useApi(alertApiRef);

  const {
    value: announcement,
    loading,
    error,
  } = useAsync(async () => announcementsApi.announcementByID(id), [id]);

  const onSubmit = async (request: CreateAnnouncementRequest) => {
    try {
      await announcementsApi.updateAnnouncement(id, request);
      alertApi.post({ message: 'Announcement updated.', severity: 'success' });
      handleFormSubmitted();
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  } else if (!announcement) {
    return <Alert severity="error" />;
  }

  return <AnnouncementForm initialData={announcement} onSubmit={onSubmit} />;
};
