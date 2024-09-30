import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { InfoCard } from '@backstage/core-components';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';
import {
  Button,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  TextField,
} from '@material-ui/core';
import { CreateAnnouncementRequest } from '@procore-oss/backstage-plugin-announcements-react';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import CategoryInput from './CategoryInput';

const useStyles = makeStyles(theme => ({
  formRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

type AnnouncementFormProps = {
  initialData: Announcement;
  onSubmit: (data: CreateAnnouncementRequest) => Promise<void>;
};

export const AnnouncementForm = ({
  initialData,
  onSubmit,
}: AnnouncementFormProps) => {
  const classes = useStyles();
  const identityApi = useApi(identityApiRef);
  
  const [form, setForm] = React.useState({
    ...initialData,
    category: initialData.category?.slug,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({
      name: event.target.name,
      checked: event.target.checked,
    })

    setForm({
      ...form,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const userIdentity = await identityApi.getBackstageIdentity();
    const createRequest = {
      ...form,
      ...{
        publisher: userIdentity.userEntityRef,
      },
    };

    await onSubmit(createRequest);
    setLoading(false);
  };

console.log({form})

  return (
    <InfoCard
      title={initialData.title ? `Edit announcement` : 'New announcement'}
    >
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
        <CategoryInput
          setForm={setForm}
          form={form}
          initialValue={initialData.category?.title ?? ''}
        />
        <TextField
          id="excerpt"
          type="text"
          label="Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <MDEditor
          value={form.body}
          style={{ minHeight: '30rem' }}
          onChange={value => setForm({ ...form, ...{ body: value || '' } })}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name="active"
                checked={form.active}
                onChange={handleChangeActive}
              />
            }
            label="Active"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading || !form.body}
        >
          Submit
        </Button>
      </form>
    </InfoCard>
  );
};
