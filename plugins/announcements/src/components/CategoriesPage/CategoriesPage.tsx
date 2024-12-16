import React, { useState } from 'react';
import {
  Page,
  Header,
  Content,
  Table,
  TableColumn,
  ErrorPanel,
} from '@backstage/core-components';
import { NewCategoryDialog } from '../NewCategoryDialog';
import {
  useAnnouncementsTranslation,
  useCategories,
  announcementsApiRef,
} from '@procore-oss/backstage-plugin-announcements-react';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';
import { useDeleteCategoryDialogState } from './useDeleteCategoryDialogState';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { ResponseError } from '@backstage/errors';
import { IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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
          <IconButton onClick={() => openDeleteDialog(category)}>
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
          <Typography style={{ padding: 2 }}>
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
