import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { Page, Header, Content } from '@backstage/core-components';
import { alertApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import { rootRouteRef } from '../../routes';
import { AnnouncementForm } from '../AnnouncementForm';
import {
  CreateAnnouncementRequest,
  announcementsApiRef,
  useAnnouncementsTranslation,
  useCategories,
} from '@procore-oss/backstage-plugin-announcements-react';
import {
  Announcement,
  Category,
} from '@procore-oss/backstage-plugin-announcements-common';

type CreateAnnouncementPageProps = {
  themeId: string;
  title: string;
  subtitle?: ReactNode;
};

export const CreateAnnouncementPage = (props: CreateAnnouncementPageProps) => {
  const announcementsApi = useApi(announcementsApiRef);
  const rootPage = useRouteRef(rootRouteRef);
  const alertApi = useApi(alertApiRef);
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { t } = useAnnouncementsTranslation();

  const onSubmit = async (request: CreateAnnouncementRequest) => {
    const { category } = request;

    const slugs = categories.map((c: Category) => c.slug);
    let alertMsg = t('createAnnouncementPage.alertMessage') as string;

    try {
      if (category) {
        const categorySlug = slugify(category, {
          lower: true,
        });
        if (slugs.indexOf(categorySlug) === -1) {
          alertMsg = alertMsg.replace('.', '');
          alertMsg = `${alertMsg} ${t('createAnnouncementPage.alertMessageWithNewCategory')} ${category}.`;

          await announcementsApi.createCategory({
            title: category,
          });
        }
      }

      await announcementsApi.createAnnouncement({
        ...request,
        category: request.category?.toLowerCase(),
      });
      alertApi.post({ message: alertMsg, severity: 'success' });

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
          initialData={{} as Announcement}
          onSubmit={onSubmit}
        />
      </Content>
    </Page>
  );
};
