import React, { useState } from 'react';

import {
  Content,
  ErrorPanel,
  Progress,
  Table,
  TableColumn,
} from '@backstage/core-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { announcementsApiRef } from '@procore-oss/backstage-plugin-announcements-react';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import { useAsyncRetry } from 'react-use';
import { useDeleteAnnouncementDialogState } from '../../AnnouncementsPage/useDeleteAnnouncementDialogState';
import { DeleteAnnouncementDialog } from '../../AnnouncementsPage/DeleteAnnouncementDialog';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import { AnnouncementForm } from '../../AnnouncementForm';

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

export const AnnouncementsContent = () => {
  const classes = useStyles();
  const alertApi = useApi(alertApiRef);
  const announcementsApi = useApi(announcementsApiRef);
  const navigate = useNavigate();
  const [showCreateAnnouncementForm, setShowCreateAnnouncementForm] =
    useState(false);

  const {
    loading,
    error,
    value: announcements,
    retry,
  } = useAsyncRetry(async () => await announcementsApi.announcements({}));

  const {
    isOpen: isDeleteDialogOpen,
    open: openDeleteDialog,
    close: closeDeleteDialog,
    announcement: announcementToDelete,
  } = useDeleteAnnouncementDialogState();

  const onCreateButtonClick = () => {
    setShowCreateAnnouncementForm(!showCreateAnnouncementForm);
  };

  const onTitleClick = (announcement: Announcement) => {
    navigate(`/announcements/view/${announcement.id}`);
  };

  const onEdit = (announcement: Announcement) => {
    navigate(`/announcements/edit/${announcement.id}`);
  };

  const onCancelDelete = () => {
    closeDeleteDialog();
  };
  const onConfirmDelete = async () => {
    closeDeleteDialog();

    try {
      await announcementsApi.deleteAnnouncementByID(announcementToDelete!.id);

      alertApi.post({ message: 'Announcement deleted.', severity: 'success' });
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }

    retry();
  };

  const onSubmit = async (request: CreateAnnouncementRequest) => {
    // const { category } = request;

    // const slugs = categories.map((c: Category) => c.slug);
    // let alertMsg = 'Announcement created.';

    try {
      // if (category) {
      //   const categorySlug = slugify(category, {
      //     lower: true,
      //   });
      //   if (slugs.indexOf(categorySlug) === -1) {
      //     alertMsg = alertMsg.replace('.', '');
      //     alertMsg = `${alertMsg} with new category ${category}.`;

      //     await announcementsApi.createCategory({
      //       title: category,
      //     });
      //   }
      // }

      // console.log({
      //   ...request,
      //   category: request.category?.toLowerCase(),
      // });

      await announcementsApi.createAnnouncement({
        ...request,
        category: request.category?.toLowerCase(),
      });
      // alertApi.post({ message: alertMsg, severity: 'success' });

      // navigate(rootPage());
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
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
      render: (rowData: Announcement | {}) => (rowData as Announcement).title,
    },
    {
      title: <Typography>Body</Typography>,
      sorting: true,
      field: 'body',
      render: (rowData: Announcement | {}) => (rowData as Announcement).body,
    },
    {
      title: <Typography>Publisher</Typography>,
      sorting: true,
      field: 'publisher',
      render: (rowData: Announcement | {}) =>
        (rowData as Announcement).publisher,
    },
    {
      title: <Typography>Category</Typography>,
      sorting: true,
      field: 'category',
      render: (rowData: Announcement | {}) =>
        (rowData as Announcement).category?.title ?? '',
    },
    {
      title: <Typography>Actions</Typography>,
      render: (rowData: Announcement | {}) => {
        return (
          <>
            <IconButton
              aria-label="preview"
              onClick={() => onTitleClick(rowData as Announcement)}
            >
              <PreviewIcon fontSize="small" data-testid="preview" />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => onEdit(rowData as Announcement)}
            >
              <EditIcon fontSize="small" data-testid="edit-icon" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => openDeleteDialog(rowData as Announcement)}
            >
              <DeleteIcon fontSize="small" data-testid="delete-icon" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => onCreateButtonClick()}>
          {showCreateAnnouncementForm ? 'Cancel' : 'Create Announcement'}
        </Button>
      </Grid>

      <Grid item xs={12}>
        {showCreateAnnouncementForm && (
          <Content>
            <AnnouncementForm
              initialData={{} as Announcement}
              onSubmit={onSubmit}
            />
          </Content>
        )}
      </Grid>

      <Grid item xs={12}>
        <DeleteAnnouncementDialog
          open={isDeleteDialogOpen}
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
        />
        <Table
          options={{ pageSize: 20, search: true }}
          columns={columns}
          data={announcements?.results ?? []}
          emptyContent={
            <Typography className={classes.successMessage}>
              No announcements found
            </Typography>
          }
        />
      </Grid>
    </Grid>
  );
};
