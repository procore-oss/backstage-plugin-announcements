import {
  TextField,
  Button,
  FormGroup,
  CircularProgress,
  Grid,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Announcement } from '@procore-oss/backstage-plugin-announcements-common';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useAsync from 'react-use/lib/useAsync';
import { announcementsApiRef } from '../../../api';
import { useApi } from '@backstage/core-plugin-api';

export type AnnouncementFormInputs = {
  title: string;
  excerpt: string;
  category: {
    title: string;
    slug: string;
  };
  publisher: string;
  body: string;
  sticky?: boolean;
};

export const AnnouncementForm = ({
  announcement,
  onSubmit,
}: {
  announcement?: Announcement;
  onSubmit: SubmitHandler<AnnouncementFormInputs>;
}) => {
  const { handleSubmit, control } = useForm<AnnouncementFormInputs>({
    defaultValues: {
      ...announcement,
    },
  });

  const announcementsApi = useApi(announcementsApiRef);
  const { value: categoriesValue, loading: categoriesLoading } = useAsync(
    async () => {
      return await announcementsApi.categories();
    },
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Controller
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
              />
            )}
            control={control}
          />
        </Grid>
        <Grid item>
          <Controller
            name="category"
            render={({ field }) => (
              <Autocomplete
                {...field}
                fullWidth
                getOptionSelected={(option, value) =>
                  option.slug === value.slug
                }
                getOptionLabel={option => option.title}
                options={categoriesValue ?? []}
                loading={categoriesLoading}
                onChange={(_, value) => field.onChange(value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    id="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {categoriesLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
            control={control}
          />
        </Grid>
        <Grid item>
          <Controller
            name="excerpt"
            render={({ field }) => (
              <TextField {...field} label="Excerpt" variant="outlined" />
            )}
            control={control}
          />
        </Grid>

        <Grid item>
          <Controller
            name="body"
            render={({ field }) => (
              <MDEditor {...field} style={{ minHeight: '25rem' }} />
            )}
            control={control}
          />
        </Grid>

        <Grid item>
          <Controller
            name="sticky"
            render={({ field }) => (
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      id="sticky"
                      color="primary"
                    />
                  }
                  label="Sticky announcement"
                  labelPlacement="start"
                />
              </FormGroup>
            )}
            control={control}
          />
        </Grid>

        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Grid>
    </form>
  );
};
