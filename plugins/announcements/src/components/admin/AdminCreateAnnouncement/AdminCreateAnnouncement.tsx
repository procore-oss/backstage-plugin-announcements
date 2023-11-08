import React from 'react';
import { useNavigate } from 'react-router-dom';
import { alertApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import {
  Announcement,
  announcementsApiRef,
  CreateAnnouncementRequest,
} from '../../../api';
import { adminRouteRef } from '../../../routes';
import { AnnouncementForm } from '../../AnnouncementForm';

export const AdminCreateAnnouncement = ({
  handleFormSubmitted,
}: {
  handleFormSubmitted: () => void;
}) => {
  const announcementsApi = useApi(announcementsApiRef);
  const adminPage = useRouteRef(adminRouteRef);
  const alertApi = useApi(alertApiRef);
  const navigate = useNavigate();

  const onSubmit = async (request: CreateAnnouncementRequest) => {
    try {
      await announcementsApi.createAnnouncement(request);
      alertApi.post({ message: 'Announcement created.', severity: 'success' });
      handleFormSubmitted();

      navigate(adminPage());
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  return (
    <AnnouncementForm initialData={{} as Announcement} onSubmit={onSubmit} />
  );
};
