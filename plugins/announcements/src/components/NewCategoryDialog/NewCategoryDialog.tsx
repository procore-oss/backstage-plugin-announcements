import React from 'react';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import {
  announcementsApiRef,
  useAnnouncementsTranslation,
} from '@procore-oss/backstage-plugin-announcements-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

type NewCategoryDialogProps = {
  open: boolean;
  onClose: () => any;
};

export const NewCategoryDialog = (props: NewCategoryDialogProps) => {
  const announcementsApi = useApi(announcementsApiRef);
  const { t } = useAnnouncementsTranslation();
  const alertApi = useApi(alertApiRef);

  const [title, setTitle] = React.useState('');

  const onClose = () => {
    props.onClose();
  };

  const onConfirm = async () => {
    try {
      await announcementsApi.createCategory({
        title,
      });
      alertApi.post({
        message: t('newCategoryDialog.createdMessage'),
        severity: 'success',
      });
      props.onClose();
    } catch (err) {
      alertApi.post({ message: (err as Error).message, severity: 'error' });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>{t('newCategoryDialog.newCategory')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          id="title"
          label={t('newCategoryDialog.title')}
          value={title}
          onChange={handleChange}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('newCategoryDialog.cancelButton')}</Button>

        <Button onClick={onConfirm} color="primary">
          {t('newCategoryDialog.createButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
