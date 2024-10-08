import React, { useState } from 'react';
import {
  ErrorPanel,
  Progress,
  Table,
  TableColumn,
} from '@backstage/core-components';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import {
  announcementsApiRef,
  CreateAnnouncementRequest,
  useCategories,
} from '@procore-oss/backstage-plugin-announcements-react';
import {
  Announcement,
  announcementCreatePermission,
  announcementDeletePermission,
  announcementUpdatePermission,
  Category,
} from '@procore-oss/backstage-plugin-announcements-common';
import { useAsyncRetry } from 'react-use';
import { useDeleteAnnouncementDialogState } from '../../AnnouncementsPage/useDeleteAnnouncementDialogState';
import { DeleteAnnouncementDialog } from '../../AnnouncementsPage/DeleteAnnouncementDialog';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AnnouncementForm } from '../../AnnouncementForm';
import slugify from 'slugify';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  RequirePermission,
  usePermission,
} from '@backstage/plugin-permission-react';

export const AnnouncementsContent = () => {
  const alertApi = useApi(alertApiRef);
  const announcementsApi = useApi(announcementsApiRef);
  const navigate = useNavigate();
  const { categories } = useCategories();

  const { loading: loadingCreatePermission, allowed: canCreateAnnouncement } =
    usePermission({
      permission: announcementCreatePermission,
    });

  const { loading: loadingUpdatePermission, allowed: canUpdateAnnouncement } =
    usePermission({
      permission: announcementUpdatePermission,
    });

  const { loading: loadingDeletePermission, allowed: canDeleteAnnouncement } =
    usePermission({
      permission: announcementDeletePermission,
    });

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
    const { category } = request;

    const slugs = categories.map((c: Category) => c.slug);
    let alertMsg = 'Announcement created.';

    try {
      if (category) {
        const categorySlug = slugify(category, {
          lower: true,
        });
        if (slugs.indexOf(categorySlug) === -1) {
          alertMsg = alertMsg.replace('.', '');
          alertMsg = `${alertMsg} with new category ${category}.`;

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

      setShowCreateAnnouncementForm(false);
      retry();
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

  const columns: TableColumn<Announcement>[] = [
    {
      title: <Typography>Title</Typography>,
      sorting: true,
      field: 'title',
      render: rowData => rowData.title,
    },
    {
      title: <Typography>Body</Typography>,
      sorting: true,
      field: 'body',
      render: rowData => rowData.body,
    },
    {
      title: <Typography>Publisher</Typography>,
      sorting: true,
      field: 'publisher',
      render: rowData => rowData.publisher,
    },
    {
      title: <Typography>Category</Typography>,
      sorting: true,
      field: 'category',
      render: rowData => rowData.category?.title ?? '',
    },
    {
      title: <Typography>Status</Typography>,
      sorting: true,
      field: 'category',
      render: rowData => (rowData.active ? 'Active' : 'Inactive'),
    },
    {
      title: <Typography>Actions</Typography>,
      render: rowData => {
        return (
          <>
            <IconButton
              aria-label="preview"
              onClick={() => onTitleClick(rowData)}
            >
              <PreviewIcon fontSize="small" data-testid="preview" />
            </IconButton>

            <IconButton
              aria-label="edit"
              disabled={loadingUpdatePermission || !canUpdateAnnouncement}
              onClick={() => onEdit(rowData)}
            >
              <EditIcon fontSize="small" data-testid="edit-icon" />
            </IconButton>

            <IconButton
              aria-label="delete"
              disabled={loadingDeletePermission || !canDeleteAnnouncement}
              onClick={() => openDeleteDialog(rowData)}
            >
              <DeleteIcon fontSize="small" data-testid="delete-icon" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <RequirePermission permission={announcementCreatePermission}>
      <Grid container>
        <Grid item xs={12}>
          <Button
            disabled={loadingCreatePermission || !canCreateAnnouncement}
            variant="contained"
            onClick={() => onCreateButtonClick()}
          >
            {showCreateAnnouncementForm ? 'Cancel' : 'Create Announcement'}
          </Button>
        </Grid>

        {showCreateAnnouncementForm && (
          <Grid item xs={12}>
            <AnnouncementForm
              initialData={{} as Announcement}
              onSubmit={onSubmit}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Table
            title="Announcements"
            options={{ pageSize: 20, search: true }}
            columns={columns}
            data={announcements?.results ?? []}
            emptyContent={<Typography p={2}>No announcements found</Typography>}
          />

          <DeleteAnnouncementDialog
            open={isDeleteDialogOpen}
            onCancel={onCancelDelete}
            onConfirm={onConfirmDelete}
          />
        </Grid>
      </Grid>
    </RequirePermission>
  );
};
