import React, { ReactNode } from 'react';
import { useAsync, useAsyncRetry } from 'react-use';
import { useLocation } from 'react-router-dom';
import { usePermission } from '@backstage/plugin-permission-react';
import {
  announcementCreatePermission,
  announcementUpdatePermission,
  announcementDeletePermission,
  Announcement,
} from '@procore-oss/backstage-plugin-announcements-common';
import { DateTime } from 'luxon';
import {
  Page,
  Header,
  Content,
  Link,
  ItemCardGrid,
  Progress,
  ItemCardHeader,
  ContentHeader,
  LinkButton,
} from '@backstage/core-components';
import { alertApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import { parseEntityRef } from '@backstage/catalog-model';
import {
  EntityPeekAheadPopover,
  entityRouteRef,
} from '@backstage/plugin-catalog-react';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  announcementCreateRouteRef,
  announcementEditRouteRef,
  announcementViewRouteRef,
  rootRouteRef,
} from '../../routes';
import { announcementsApiRef } from '../../api';
import { DeleteAnnouncementDialog } from './DeleteAnnouncementDialog';
import { useDeleteAnnouncementDialogState } from './useDeleteAnnouncementDialogState';
import { Pagination } from '@material-ui/lab';
import { ContextMenu } from './ContextMenu';
import { Newsfeed } from '../Newsfeed';

type AnnouncementsPageProps = {
  themeId: string;
  title: string;
  subtitle?: ReactNode;
  maxPerPage?: number;
  category?: string;
};

export const AnnouncementsPage = (props: AnnouncementsPageProps) => {
  const announcementsApi = useApi(announcementsApiRef);

  const { value: announcementsList } = useAsync(async () =>
    announcementsApi.announcements({}),
  );

  if (!announcementsList) {
    return <Typography>There aren't any announcements</Typography>;
  }

  return (
    <Page themeId={props.themeId}>
      <Header title={props.title} subtitle={props.subtitle}>
        <ContextMenu />
      </Header>

      <Content>
        <Newsfeed announcements={announcementsList} />
      </Content>
    </Page>
  );
};
