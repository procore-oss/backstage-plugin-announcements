import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { announcementsTranslationRef } from '../translation';

export const useAnnouncementsTranslation = () => {
  return useTranslationRef(announcementsTranslationRef);
};
