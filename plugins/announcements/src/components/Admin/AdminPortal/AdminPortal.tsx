import React, { useState } from 'react';

import { Page, Header, Content } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { AnnouncementsContent } from '../AnnouncementsContent';
import { CategoriesContent } from '../CategoriesContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const useStyles = makeStyles(() => ({
  tabPanel: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
}));

const AdminPortalContent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('announcements');
  const handleChange = (_event: React.ChangeEvent<{}>, tabValue: string) => {
    setTab(tabValue);
  };

  return (
    <TabContext value={tab}>
      <TabList onChange={handleChange}>
        <Tab label="Announcements" value="announcements" />
        <Tab label="Categories" value="categories" />
      </TabList>
      <TabPanel value="announcements" className={classes.tabPanel}>
        <AnnouncementsContent />
      </TabPanel>
      <TabPanel value="categories" className={classes.tabPanel}>
        <CategoriesContent />
      </TabPanel>
    </TabContext>
  );
};

/** @public */
export const AdminPortal = () => {
  return (
    <Page themeId="tool">
      <Header
        title="Admin Portal for Announcements"
        subtitle="Manage announcements and categories"
      />
      <Content>
        <AdminPortalContent />
      </Content>
    </Page>
  );
};
