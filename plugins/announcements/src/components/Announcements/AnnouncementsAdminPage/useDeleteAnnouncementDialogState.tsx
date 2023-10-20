import { useCallback, useState } from 'react';
import { AnnouncementFe } from '@procore-oss/backstage-plugin-announcements-common';

export type DeleteAnnouncementDialogState = {
  open: (a: AnnouncementFe) => void;
  close: () => void;

  isOpen: boolean;
  announcement?: AnnouncementFe;
};

export function useDeleteAnnouncementDialogState(): DeleteAnnouncementDialogState {
  const [state, setState] = useState<{
    open: boolean;
    announcement?: AnnouncementFe;
  }>({ open: false });

  const setOpen = useCallback(
    (a: AnnouncementFe) => {
      setState({
        open: true,
        announcement: a,
      });
    },
    [setState],
  );

  const setClosed = useCallback(() => {
    setState({
      open: false,
      announcement: undefined,
    });
  }, [setState]);

  return {
    open: setOpen,
    close: setClosed,

    announcement: state.announcement,
    isOpen: state.open,
  };
}
