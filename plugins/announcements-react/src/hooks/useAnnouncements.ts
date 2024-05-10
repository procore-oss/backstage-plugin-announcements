import { useApi } from '@backstage/core-plugin-api';
import { announcementsApiRef } from '../apis';
import {
  Announcement,
  AnnouncementsFilters,
} from '@procore-oss/backstage-plugin-announcements-common';
import { useAsyncRetry } from 'react-use';

type UseAnnouncementsPropOptions = {
  dependencies?: any[];
};

export const useAnnouncements = (
  props: AnnouncementsFilters,
  options?: UseAnnouncementsPropOptions,
): {
  announcements: Announcement[];
  total: number;
  loading: boolean;
  error: Error | undefined;
  retry: () => void;
} => {
  const api = useApi(announcementsApiRef);

  const {
    value: announcementsList,
    loading,
    error,
    retry,
  } = useAsyncRetry(async () => {
    return await api.announcements(props);
  }, [api, ...(options?.dependencies ?? [])]);

  return {
    announcements: announcementsList?.results ?? [],
    total: announcementsList?.count ?? 0,
    loading,
    error,
    retry,
  };
};
