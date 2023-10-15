import React from 'react';
import { Content } from '@backstage/core-components';
import {
  alertApiRef,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { announcementsApiRef, CreateAnnouncementRequest } from '../../../api';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { SubmitHandler } from 'react-hook-form';
import {
  AnnouncementForm,
  AnnouncementFormInputs,
} from '../AnnouncementForm/AnnouncementForm';

export const CreateAnnouncementContent = () => {
  const announcementsApi = useApi(announcementsApiRef);
  const identityApi = useApi(identityApiRef);
  const alertApi = useApi(alertApiRef);

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
    <Content>
      <AnnouncementForm announcement={{} as Announcement} onSubmit={onSubmit} />
    </Content>
  );
};
