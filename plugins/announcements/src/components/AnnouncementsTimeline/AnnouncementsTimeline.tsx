import { useApi } from '@backstage/core-plugin-api';
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

type AnnouncementsTimelineProps = {
  options?: {
    results?: {
      max?: number;
    };
    timeline?: {
      align?: 'left' | 'right' | 'alternate';
      minWidth?: string;
    };
  };
};

const DEFAULT_TIMELINE_ALIGNMENT = 'alternate';
const DEFAULT_TIMELINE_WIDTH = '425px';
const DEFAULT_RESULTS_MAX = 10;

export const AnnouncementsTimeline = ({
  options,
}: AnnouncementsTimelineProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const announcementsApi = useApi(announcementsApiRef);

  useEffect(() => {
    async function fetchData() {
      const { results } = await announcementsApi.announcements({
        max: options?.results?.max ?? DEFAULT_RESULTS_MAX,
      });
      setAnnouncements(results);
    }

    fetchData();
  }, [announcements, announcementsApi, options?.results?.max]);

  if (!announcements) return <>No announcements</>;

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
                <Link to={`/announcements/view/${a.id}`}>
                  <Typography key={`th6-${a.id}`} variant="h6" component="span">
                    {a.title}
                  </Typography>
                  <Typography key={`te-${a.id}`} variant="body2">
                    {a.excerpt}
                  </Typography>
                </Link>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Stack>
  );
};
