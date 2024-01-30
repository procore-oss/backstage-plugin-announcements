import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { Typography, Box } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineOppositeContent,
  TimelineConnector,
  TimelineDot,
  TimelineSeparator,
} from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Announcement, announcementsApiRef } from '../../api';
import Stack from '@mui/material/Stack';
import { DateTime } from 'luxon';
import { announcementViewRouteRef } from '../../routes';

/**
 * Props for the AnnouncementsTimeline component.
 */
export type AnnouncementsTimelineProps = {
  /**
   * Options for configuring the results of the timeline.
   */
  options?: {
    /**
     * Options for configuring the number of results to display.
     */
    results?: {
      /**
       * The maximum number of results to display.
       */
      max?: number;
    };
    /**
     * Options for configuring the alignment and width of the timeline.
     */
    timeline?: {
      /**
       * The alignment of the timeline items. Can be 'left', 'right', or 'alternate'.
       */
      align?: 'left' | 'right' | 'alternate';
      /**
       * The minimum width of the timeline.
       */
      minWidth?: string;
    };
  };
};

/**
 * Default alignment for the timeline.
 */
const DEFAULT_TIMELINE_ALIGNMENT = 'alternate';

/**
 * Default width for the timeline.
 */
const DEFAULT_TIMELINE_WIDTH = '425px';

/**
 * Default maximum number of results to display.
 */
const DEFAULT_RESULTS_MAX = 10;

/**
 * Renders a timeline of announcements.
 *
 * @param options - The options for the announcements timeline.
 * @returns The rendered announcements timeline.
 */
export const AnnouncementsTimeline = ({
  options,
}: AnnouncementsTimelineProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const announcementsApi = useApi(announcementsApiRef);
  const viewAnnouncementLink = useRouteRef(announcementViewRouteRef);

  useEffect(() => {
    async function fetchData() {
      const { results } = await announcementsApi.announcements({
        max: options?.results?.max ?? DEFAULT_RESULTS_MAX,
      });
      setAnnouncements(results);
    }

    fetchData();
  }, [announcements, announcementsApi, options?.results?.max]);

  if (!announcements || announcements.length === 0)
    return <>No announcements</>;

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      <Box
        sx={{ minWidth: options?.timeline?.minWidth ?? DEFAULT_TIMELINE_WIDTH }}
      >
        <Timeline
          align={options?.timeline?.align ?? DEFAULT_TIMELINE_ALIGNMENT}
        >
          {announcements.map(a => (
            <TimelineItem key={`ti-${a.id}`}>
              <TimelineOppositeContent
                key={`toc-${a.id}`}
                style={{ margin: 'auto 0' }}
              >
                {DateTime.fromISO(a.created_at).toRelative()}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent key={`tc-${a.id}`}>
                <Link to={viewAnnouncementLink({ id: a.id })}>
                  <Typography key={`th6-${a.id}`} variant="h6" component="span">
                    {a.title}
                  </Typography>
                </Link>
                <Typography key={`te-${a.id}`} variant="body2">
                  {a.excerpt}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Stack>
  );
};
