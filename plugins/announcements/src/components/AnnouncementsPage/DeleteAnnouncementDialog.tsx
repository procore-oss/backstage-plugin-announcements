import { usePermission } from '@backstage/plugin-permission-react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { announcementDeletePermission } from '@procore-oss/backstage-plugin-announcements-common';
import { useAnnouncementsTranslation } from '@procore-oss/backstage-plugin-announcements-react';
import React from 'react';

type DeleteAnnouncementDialogProps = {
  open: boolean;
  onConfirm: () => any;
  onCancel: () => any;
};

export const DeleteAnnouncementDialog = (
  props: DeleteAnnouncementDialogProps,
) => {
  const { open, onConfirm, onCancel } = props;

  const { loading: loadingDeletePermission, allowed: canDeleteAnnouncement } =
    usePermission({
      permission: announcementDeletePermission,
    });
  const { t } = useAnnouncementsTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{t('deleteDialog.title')}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>{t('deleteDialog.cancel')}</Button>

        <Button
          disabled={loadingDeletePermission || !canDeleteAnnouncement}
          onClick={onConfirm}
          color="secondary"
        >
          {t('deleteDialog.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
