import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
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

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        Are you sure you want to delete this announcement?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>

        <Button onClick={onConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
