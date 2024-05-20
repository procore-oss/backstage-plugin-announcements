import React, { useState } from 'react';

import {
  ErrorPanel,
  Progress,
  Table,
  TableColumn,
} from '@backstage/core-components';

import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';

import {
  CreateCategoryRequest,
  announcementsApiRef,
  useCategories,
} from '@procore-oss/backstage-plugin-announcements-react';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';
import { NewCategoryDialog } from '../../NewCategoryDialog';
import Button from '@mui/material/Button';
import { Grid } from '@material-ui/core';
import { CategoriesForm } from '../../CategoriesForm';
import { useApi, alertApiRef } from '@backstage/core-plugin-api';

const useStyles = makeStyles((theme: Theme) => ({
  errorBox: {
    color: theme.palette.status.error,
    backgroundColor: theme.palette.errorBackground,
    padding: '1em',
    margin: '1em',
    border: `1px solid ${theme.palette.status.error}`,
  },
  errorTitle: {
    width: '100%',
    fontWeight: 'bold',
  },
  successMessage: {
    background: theme.palette.infoBackground,
    color: theme.palette.infoText,
    padding: theme.spacing(2),
  },
}));

export const CategoriesContent = () => {
  const classes = useStyles();
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const { categories, loading, error, retry } = useCategories();
  const announcementsApi = useApi(announcementsApiRef);
  const alertApi = useApi(alertApiRef);

  const onSubmit = async (request: CreateCategoryRequest) => {
    const { title } = request;

    try {
      await announcementsApi.createCategory({
        title,
      });

      alertApi.post({ message: `${title} created`, severity: 'success' });

      retry();
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  const onCreateButtonClick = () => {
    setShowNewCategoryForm(!showNewCategoryForm);
  };

  const onNewCategoryDialogClose = () => {
    setNewCategoryDialogOpen(false);
    retry();
  };

  if (loading) {
    return <Progress />;
  }
  if (error) {
    return <ErrorPanel error={error} />;
  }

  const columns: TableColumn[] = [
    {
      title: <Typography>Title</Typography>,
      sorting: true,
      field: 'title',
      render: (rowData: Category | {}) => (rowData as Category).title,
    },
    {
      title: <Typography>Slug</Typography>,
      sorting: true,
      field: 'slug',
      render: (rowData: Category | {}) => (rowData as Category).slug,
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => onCreateButtonClick()}>
          {showNewCategoryForm ? 'Close' : 'Create category'}
        </Button>
      </Grid>

      <Grid item xs={12}>
        {showNewCategoryForm && (
          <CategoriesForm initialData={{} as Category} onSubmit={onSubmit} />
        )}
      </Grid>

      <Grid item xs={12}>
        <Table
          options={{ pageSize: 20, search: true }}
          columns={columns}
          data={categories ?? []}
          emptyContent={
            <Typography className={classes.successMessage}>
              No categories found
            </Typography>
          }
        />
      </Grid>
      <NewCategoryDialog
        open={newCategoryDialogOpen}
        onClose={onNewCategoryDialogClose}
      />
    </Grid>
  );
};
