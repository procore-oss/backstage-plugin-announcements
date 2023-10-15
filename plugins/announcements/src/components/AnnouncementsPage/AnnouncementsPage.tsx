import React, { ReactNode } from 'react';
import { useAsync } from 'react-use';
import { Page, Header, Content } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Typography } from '@material-ui/core';
import { announcementsApiRef } from '../../api';
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
