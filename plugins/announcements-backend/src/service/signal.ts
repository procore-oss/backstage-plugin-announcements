import { SignalsService } from '@backstage/plugin-signals-node';
import { Category } from '@procore-oss/backstage-plugin-announcements-common';
import { AnnouncementModel } from './model';

export type AnnouncementSignal = {
  id: string;
  category?: Category;
  publisher: string;
  title: string;
  excerpt: string;
  body: string;
};

export const broadcast = async (
  announcement: AnnouncementModel,
  signalService: SignalsService,
) => {
  if (!announcement) {
    return;
  }

  signalService.publish<AnnouncementSignal>({
    recipients: { type: 'broadcast' },
    channel: `announcements:announcement_${announcement.id}`,
    message: {
      ...announcement,
    },
  });
};
