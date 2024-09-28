import { SignalsService } from '@backstage/plugin-signals-node';
import { AnnouncementModel } from './model';
import {
  Announcement,
  AnnouncementSignal,
} from '@procore-oss/backstage-plugin-announcements-common';

export const signalAnnouncement = async (
  announcement: AnnouncementModel,
  signalService: SignalsService,
) => {
  if (!announcement) {
    return;
  }

  console.log('Broadcasting announcement', announcement);
  await signalService.publish<AnnouncementSignal>({
    recipients: { type: 'broadcast' },
    channel: 'announcement:new',
    message: {
      data: {
        ...announcement,
        created_at: announcement.created_at.toString(),
      },
    },
  });
  console.log('Broadcasted announcement');
};
