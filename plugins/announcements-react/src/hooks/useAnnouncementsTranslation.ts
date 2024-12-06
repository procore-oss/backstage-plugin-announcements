import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { translationRef } from '../translation';

export const useAnnouncementsTranslation = () => {
  return useTranslationRef(translationRef);
};
