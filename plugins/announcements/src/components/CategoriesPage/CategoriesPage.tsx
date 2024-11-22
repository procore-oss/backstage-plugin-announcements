import React, { useState } from 'react';
import {
  Page,
  Header,
  Content,
  Table,
  TableColumn,
  ErrorPanel,
} from '@backstage/core-components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { NewCategoryDialog } from '../NewCategoryDialog';
import {
  useAnnouncementsTranslation,
  useCategories,
} from '@procore-oss/backstage-plugin-announcements-react';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';
import { useDeleteCategoryDialogState } from './useDeleteCategoryDialogState';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { announcementsApiRef } from '@procore-oss/backstage-plugin-announcements-react';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { ResponseError } from '@backstage/errors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const CategoriesTable = () => {
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const announcementsApi = useApi(announcementsApiRef);
  const alertApi = useApi(alertApiRef);

  const { categories, loading, error, retry: refresh } = useCategories();

  const {
    isOpen: isDeleteDialogOpen,
    open: openDeleteDialog,
    close: closeDeleteDialog,
    category: categoryToDelete,
  } = useDeleteCategoryDialogState();
  const { t } = useAnnouncementsTranslation();

  if (error) {
    return <ErrorPanel error={error} />;
  }

  const onNewCategoryDialogClose = () => {
    setNewCategoryDialogOpen(false);
    refresh();
  };

  const onCancelDelete = () => {
    closeDeleteDialog();
  };
  const onConfirmDelete = async () => {
    closeDeleteDialog();

    try {
      await announcementsApi.deleteCategory(categoryToDelete!.slug);

      alertApi.post({
        message: t('categoriesTable.categoryDeleted'),
        severity: 'success',
      });
    } catch (err) {
      alertApi.post({
        message: (err as ResponseError).body.error.message,
        severity: 'error',
      });
    }

    refresh();
  };

  const columns: TableColumn<Category>[] = [
    {
      title: t('categoriesTable.slug'),
      field: 'slug',
      highlight: true,
    },
    {
      title: t('categoriesTable.title'),
      field: 'title',
    },
    {
      title: t('categoriesTable.actions'),
      field: 'actions',
      render: category => {
        return (
          <IconButton onClick={() => openDeleteDialog(category)} size="large">
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Table
        options={{ paging: false }}
        data={categories || []}
        columns={columns}
        isLoading={loading}
        title="Categories"
        actions={[
          {
            icon: () => <AddIcon />,
            tooltip: t('categoriesTable.addTooltip'),
            isFreeAction: true,
            onClick: _event => setNewCategoryDialogOpen(true),
          },
        ]}
        emptyContent={
          <Typography p={2}>
            {t('categoriesTable.noCategoriesFound')}
          </Typography>
        }
      />
      <NewCategoryDialog
        open={newCategoryDialogOpen}
        onClose={onNewCategoryDialogClose}
      />
      <DeleteCategoryDialog
        open={isDeleteDialogOpen}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};

type CategoriesPageProps = {
  themeId: string;
};

export const CategoriesPage = (props: CategoriesPageProps) => {
  const { t } = useAnnouncementsTranslation();
  return (
    <Page themeId={props.themeId}>
      <Header
        title={t('categoriesPage.title')}
        subtitle={t('categoriesPage.subtitle')}
      />

      <Content>
        <CategoriesTable />
      </Content>
    </Page>
  );
};
