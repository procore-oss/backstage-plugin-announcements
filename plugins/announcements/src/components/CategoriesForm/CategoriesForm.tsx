import React, { useState } from 'react';
import { InfoCard } from '@backstage/core-components';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { CreateCategoryRequest } from '@procore-oss/backstage-plugin-announcements-react';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';

const useStyles = makeStyles(theme => ({
  formRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

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
    <InfoCard title={initialData.title ? `Edit category` : 'New category'}>
      <form className={classes.formRoot} onSubmit={handleSubmit}>
        <TextField
          id="title"
          type="text"
          label="Title"
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
          disabled={loading || !form}
        >
          Submit
        </Button>
      </form>
    </InfoCard>
  );
};
