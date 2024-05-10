import { useApi } from '@backstage/core-plugin-api';
import { announcementsApiRef } from '../apis';
import useAsync from 'react-use/esm/useAsync';
import {
  Announcement,
  AnnouncementsFilters,
} from '@procore-oss/backstage-plugin-announcements-common';

export const useAnnouncements = (
  props: AnnouncementsFilters,
): {
  announcements: Announcement[];
  loading: boolean;
  error: Error | undefined;
} => {
  const api = useApi(announcementsApiRef);

  const {
    value: announcements,
    loading,
    error,
  } = useAsync(async () => {
    return await api.announcements(props);
  });

  return {
    announcements: announcements?.results ?? [],
    loading,
    error,
  };
};
