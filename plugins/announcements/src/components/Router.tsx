import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequirePermission } from '@backstage/plugin-permission-react';
import {
  announcementCreatePermission,
  announcementUpdatePermission,
} from '@procore-oss/backstage-plugin-announcements-common';
import {
  announcementCreateRouteRef,
  announcementEditRouteRef,
  announcementViewRouteRef,
  categoriesListRouteRef,
} from '../routes';
import { AnnouncementsPage } from './AnnouncementsPage';
import { AnnouncementPage } from './AnnouncementPage';
import { CreateAnnouncementContent } from './Announcements/CreateAnnouncementContent';
import { EditAnnouncementContent } from './Announcements/EditAnnouncementContent';
import { CategoriesPage } from './CategoriesPage';

type RouterProps = {
  themeId?: string;
  title?: string;
  subtitle?: string;
};

export const Router = (props: RouterProps) => {
  const propsWithDefaults = {
    themeId: 'home',
    title: 'Announcements',
    ...props,
  };

  return (
    <Routes>
      <Route path="/" element={<AnnouncementsPage {...propsWithDefaults} />} />
      <Route
        path={`${announcementViewRouteRef.path}`}
        element={<AnnouncementPage {...propsWithDefaults} />}
      />
      <Route
        path={`${announcementCreateRouteRef.path}`}
        element={
          <RequirePermission permission={announcementCreatePermission}>
            <CreateAnnouncementContent />
          </RequirePermission>
        }
      />
      <Route
        path={`${announcementEditRouteRef.path}`}
        element={
          <RequirePermission permission={announcementUpdatePermission}>
            <EditAnnouncementContent />
          </RequirePermission>
        }
      />

      <Route
        path={`${categoriesListRouteRef.path}`}
        element={<CategoriesPage themeId={propsWithDefaults.themeId} />}
      />
    </Routes>
  );
};
