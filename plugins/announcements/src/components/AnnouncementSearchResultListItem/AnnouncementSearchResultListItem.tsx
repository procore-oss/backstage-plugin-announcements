import React from 'react';
import { DateTime } from 'luxon';
import { Link } from '@backstage/core-components';
import {
  IndexableDocument,
  ResultHighlight,
} from '@backstage/plugin-search-common';
import { HighlightedSearchResultText } from '@backstage/plugin-search-react';
import { useAnnouncementsTranslation } from '@procore-oss/backstage-plugin-announcements-react';
import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const useStyles = makeStyles({
  createdAt: {
    display: 'block',
    marginTop: '0.2rem',
    marginBottom: '0.8rem',
    fontSize: '0.8rem',
  },
  excerpt: {
    lineHeight: '1.55',
  },
  itemText: {
    wordBreak: 'break-all',
  },
});

type IndexableAnnouncement = IndexableDocument & {
  createdAt: string;
};

export interface AnnouncementSearchResultProps {
  result?: IndexableDocument;
  highlight?: ResultHighlight;
  rank?: number;
}

export const AnnouncementSearchResultListItem = ({
  result,
  highlight,
}: AnnouncementSearchResultProps) => {
  const classes = useStyles();
  const { t } = useAnnouncementsTranslation();

  if (!result) {
    return null;
  }

  const document = result as IndexableAnnouncement;

  const title = (
    <Link noTrack to={result.location}>
      {highlight?.fields.title ? (
        <HighlightedSearchResultText
          text={highlight.fields.title}
          preTag={highlight.preTag}
          postTag={highlight.postTag}
        />
      ) : (
        result.title
      )}
    </Link>
  );
  const excerpt = (
    <>
      <span className={classes.createdAt}>
        {`${t('announcementSearchResultListItem.published')} `}
        <span title={document.createdAt}>
          {DateTime.fromISO(document.createdAt).toRelative()}
        </span>
      </span>
      <>
        {highlight?.fields.text ? (
          <HighlightedSearchResultText
            text={highlight.fields.text}
            preTag={highlight.preTag}
            postTag={highlight.postTag}
          />
        ) : (
          result.text
        )}
      </>
    </>
  );

  return (
    <>
      <ListItem alignItems="center">
        <ListItemIcon
          title={t('announcementSearchResultListItem.announcement')}
        >
          <RecordVoiceOverIcon />
        </ListItemIcon>
        <ListItemText
          primary={title}
          secondary={excerpt}
          className={classes.itemText}
          primaryTypographyProps={{ variant: 'h6' }}
        />
      </ListItem>

      <Divider component="li" />
    </>
  );
};
