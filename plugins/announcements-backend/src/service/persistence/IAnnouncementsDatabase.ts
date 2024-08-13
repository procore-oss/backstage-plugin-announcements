import { AnnouncementsFilters } from '@clark-associates/backstage-plugin-announcements-common';
import {
  AnnouncementModelsList,
  AnnouncementUpsert,
} from './AnnouncementsDatabase';
import { AnnouncementModel } from '../model';

export interface IAnnouncementsDatabase {
  announcements(request: AnnouncementsFilters): Promise<AnnouncementModelsList>;

  announcementByID(id: string): Promise<AnnouncementModel | undefined>;

  deleteAnnouncementByID(id: string): Promise<void>;

  insertAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<AnnouncementModel>;

  updateAnnouncement(
    announcement: AnnouncementUpsert,
  ): Promise<AnnouncementModel>;
}
