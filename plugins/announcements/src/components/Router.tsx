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
  adminRouteRef,
} from '../routes';
import { AnnouncementsPage } from './AnnouncementsPage';
import { AnnouncementPage } from './AnnouncementPage';
import { CreateAnnouncementPage } from './CreateAnnouncementPage';
import { EditAnnouncementPage } from './EditAnnouncementPage';
import { CategoriesPage } from './CategoriesPage';
import { AdminPage } from './admin/AdminPage/AdminPage';

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

  const adminPropsWithDefaults = {
    themeId: 'home',
    title: 'Admin Portal',
    ...props,
  };

  return (
    <Routes>
      <Route path="/" element={<AnnouncementsPage {...propsWithDefaults} />} />
      <Route
        path={adminRouteRef.path}
        element={<AdminPage {...adminPropsWithDefaults} />}
      />
      <Route
        path={`${announcementViewRouteRef.path}`}
        element={<AnnouncementPage {...propsWithDefaults} />}
      />
      <Route
        path={`${announcementCreateRouteRef.path}`}
        element={
          <RequirePermission permission={announcementCreatePermission}>
            <CreateAnnouncementPage {...propsWithDefaults} />
          </RequirePermission>
        }
      />
      <Route
        path={`${announcementEditRouteRef.path}`}
        element={
          <RequirePermission permission={announcementUpdatePermission}>
            <EditAnnouncementPage {...propsWithDefaults} />
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
