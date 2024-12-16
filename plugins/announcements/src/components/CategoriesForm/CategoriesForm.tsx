import React, { useState } from 'react';
import { InfoCard } from '@backstage/core-components';
import {
  CreateCategoryRequest,
  useAnnouncementsTranslation,
} from '@procore-oss/backstage-plugin-announcements-react';
import {
  announcementCreatePermission,
  Category,
} from '@procore-oss/backstage-plugin-announcements-common';
import { usePermission } from '@backstage/plugin-permission-react';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    formRoot: {
      '& > *': {
        margin: theme?.spacing?.(1) ?? '8px',
      },
    },
  };
});

export type CategoriesFormProps = {
  initialData: Category;
  onSubmit: (data: CreateCategoryRequest) => Promise<void>;
};

export const CategoriesForm = ({
  initialData,
  onSubmit,
}: CategoriesFormProps) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { t } = useAnnouncementsTranslation();

  const { loading: loadingCreatePermission, allowed: canCreateCategory } =
    usePermission({
      permission: announcementCreatePermission,
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    await onSubmit(form);
    setLoading(false);
  };

  return (
    <InfoCard
      title={
        initialData.title
          ? t('categoriesForm.editCategory')
          : t('categoriesForm.newCategory')
      }
    >
      <form className={classes.formRoot} onSubmit={handleSubmit}>
        <TextField
          id="title"
          type="text"
          label={t('categoriesForm.titleLabel')}
          value={form.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={
            loading || !form || loadingCreatePermission || !canCreateCategory
          }
        >
          {t('categoriesForm.submit')}
        </Button>
      </form>
    </InfoCard>
  );
};
