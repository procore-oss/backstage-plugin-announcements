import {
  Page,
  Header,
  Content,
  ContentHeader,
} from '@backstage/core-components';
import { Alert } from '@material-ui/lab';
import React from 'react';

export const NotAllowed = () => {
  return (
    <Page themeId="home">
      <Header title="Unauthorized" />

      <Content>
        <ContentHeader title="" />
        <Alert severity="error">
          You do not have permission to manage announcements.
        </Alert>
      </Content>
    </Page>
  );
};
