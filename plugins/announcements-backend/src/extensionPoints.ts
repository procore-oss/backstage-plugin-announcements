import { createExtensionPoint } from '@backstage/backend-plugin-api';
import { IAnnouncementsDatabase } from './service/persistence/IAnnouncementsDatabase';

export interface AnnouncementsProviderExtensionPoint {
  AddAnnouncemnetsDatabase(provider: IAnnouncementsDatabase): void;
}

export const announcementsProviderExtensionPoint =
  createExtensionPoint<AnnouncementsProviderExtensionPoint>({
    id: 'announcements.Provider',
  });
