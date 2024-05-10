import { useApi } from '@backstage/core-plugin-api';
import { announcementsApiRef } from '../apis';
import useAsync from 'react-use/esm/useAsync';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';

export const useCategories = (): {
  categories: Category[];
  loading: boolean;
} => {
  const api = useApi(announcementsApiRef);

  const { value: categories, loading } = useAsync(async () => {
    return await api.categories();
  });

  return {
    categories: categories ?? [],
    loading,
  };
};
