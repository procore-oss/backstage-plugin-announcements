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

type Inputs = {
  title: string;
  excerpt: string;
  category: {
    title: string;
    slug: string;
  };
  body: string;
  sticky?: boolean;
};

export const Form = ({
  announcement,
  onSubmit,
}: {
  announcement?: Announcement;
  onSubmit: SubmitHandler<Inputs>;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const categoriesLoading = false;
  const categories = [
    {
      title: 'Sports',
      slug: 'sports',
    },
    {
      title: 'News',
      slug: 'news',
    },
    {
      title: 'Travel',
      slug: 'travel',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                value={announcement ? announcement.title : ''}
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            )}
            name="title"
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
                value={
                  announcement ? announcement.category : { slug: '', title: '' }
                }
                options={categories}
                loading={categoriesLoading}
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
        {/* <Grid item>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Excerpt"
                variant="outlined"
                value={announcement ? announcement.excerpt : ''}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
            name="title"
            control={control}
          />
        </Grid> */}

        <Grid item>
          <Controller
            name="body"
            render={({ field }) => (
              <MDEditor
                {...field}
                style={{ minHeight: '30rem' }}
                value={announcement ? announcement.body : ''}
              />
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
                      checked={announcement ? announcement.sticky : false}
                      // onChange={handleChange}
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
