import { screen } from '@testing-library/react';
import {
  AnnouncementsTimeline,
  AnnouncementsTimelineProps,
} from './AnnouncementsTimeline';
import React from 'react';
import { TestApiProvider, renderInTestApp } from '@backstage/test-utils';
import {
  announcementsApiRef,
  AnnouncementsApi,
  AnnouncementsList,
} from '../../api';

const renderMockTimelineComponent = async ({
  announcements,
  options,
}: {
  announcements: AnnouncementsList;
  options?: AnnouncementsTimelineProps['options'];
}) => {
  const mockedAnnouncementsApi: Partial<AnnouncementsApi> = {
    announcements: jest.fn().mockImplementation(() => {
      return Promise.resolve(announcements);
    }),
  };

  await renderInTestApp(
    <TestApiProvider apis={[[announcementsApiRef, mockedAnnouncementsApi]]}>
      <AnnouncementsTimeline {...{ options }} />
    </TestApiProvider>,
  );
};

describe('AnnouncementsTimeline', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders no announcements message when there are no announcements', async () => {
    await renderMockTimelineComponent({
      announcements: { count: 0, results: [] },
    });

    expect(screen.getByText('No announcements')).toBeInTheDocument();
  });

  it('renders announcements timeline with correct number of announcements', async () => {
    const announcementsList: AnnouncementsList = {
      count: 2,
      results: [
        {
          id: '1',
          title: 'Announcement 1',
          excerpt: 'Excerpt 1',
          body: 'Body 1',
          publisher: 'Publisher 1',
          created_at: '2022-01-01',
        },
        {
          id: '2',
          title: 'Announcement 2',
          excerpt: 'Excerpt 2',
          body: 'Body 2',
          publisher: 'Publisher 2',
          created_at: '2022-01-02',
        },
      ],
    };

    await renderMockTimelineComponent({ announcements: announcementsList });

    announcementsList.results.forEach(a => {
      expect(screen.getByText(a.title)).toBeInTheDocument();
      expect(screen.getByText(a.excerpt)).toBeInTheDocument();
    });
  });
});
