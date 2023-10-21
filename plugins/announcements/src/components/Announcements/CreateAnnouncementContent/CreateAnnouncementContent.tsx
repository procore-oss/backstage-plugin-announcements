import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Header, Content } from '@backstage/core-components';
import {
  alertApiRef,
  identityApiRef,
  useApi,
  useRouteRef,
} from '@backstage/core-plugin-api';

import { AnnouncementForm } from '../AnnouncementForm';
import { CreateAnnouncementRequest, announcementsApiRef } from '../../../api';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { rootRouteRef } from '../../../routes';
import { SubmitHandler } from 'react-hook-form';
import { AnnouncementFormInputs } from '../AnnouncementForm/AnnouncementForm';

type CreateAnnouncementPageProps = {
  themeId: string;
  title: string;
  subtitle?: ReactNode;
};

export const CreateAnnouncementContent = (
  props: CreateAnnouncementPageProps,
) => {
  const announcementsApi = useApi(announcementsApiRef);
  const rootPage = useRouteRef(rootRouteRef);
  const alertApi = useApi(alertApiRef);
  const navigate = useNavigate();
  const identityApi = useApi(identityApiRef);

  const onSubmit: SubmitHandler<AnnouncementFormInputs> = async formData => {
    const { userEntityRef } = await identityApi.getBackstageIdentity();

    try {
      const newAnnouncement: CreateAnnouncementRequest = {
        ...formData,
        category: formData.category?.slug,
        publisher: userEntityRef,
      };

      await announcementsApi.createAnnouncement(newAnnouncement);
      alertApi.post({ message: 'Announcement created', severity: 'success' });
      navigate(rootPage());
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  return (
    <Page themeId={props.themeId}>
      <Header title={props.title} subtitle={props.subtitle} />

      <Content>
        <AnnouncementForm
          announcement={{} as Announcement}
          onSubmit={onSubmit}
        />
      </Content>
    </Page>
  );
};
