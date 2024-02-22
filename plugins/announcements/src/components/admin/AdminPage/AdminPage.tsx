import React, { ReactNode } from 'react';
import { usePermission } from '@backstage/plugin-permission-react';
import { announcementCreatePermission } from '@procore-oss/backstage-plugin-announcements-common';
import { Page, Header, Progress } from '@backstage/core-components';
import { ContextMenu } from './ContextMenu';
import { AdminPageLayout } from '../AdminPageLayout';
import { NotAllowed } from '../../NotAllowed';

type AdminPageProps = {
  themeId?: string;
  title?: string;
  subtitle?: ReactNode;
};

const DEFAULT_THEME_ID = 'home';
const DEFAULT_PAGE_NAME = 'Admin Portal';

export const AdminPage = (props: AdminPageProps) => {
  const { loading: loadingCreatePermission, allowed } = usePermission({
    permission: announcementCreatePermission,
  });

  if (loadingCreatePermission) {
    return <Progress />;
  } else if (!allowed) {
    return <NotAllowed />;
  }

  return (
    <Page themeId={props.themeId ?? DEFAULT_THEME_ID}>
      <Header
        title={props.title ?? DEFAULT_PAGE_NAME}
        subtitle={props.subtitle}
      >
        <ContextMenu />
      </Header>

      <AdminPageLayout allowed={allowed} />
    </Page>
  );
};
