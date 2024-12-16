import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteRef } from '@backstage/core-plugin-api';
import {
  announcementAdminRouteRef,
  categoriesListRouteRef,
} from '../../routes';
import { useAnnouncementsTranslation } from '@procore-oss/backstage-plugin-announcements-react';
import {
  makeStyles,
  Box,
  IconButton,
  Popover,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import Description from '@material-ui/icons/Description';

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
});

export function ContextMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const announcementsLink = useRouteRef(announcementAdminRouteRef);
  const categoriesLink = useRouteRef(categoriesListRouteRef);
  const navigate = useNavigate();
  const { t } = useAnnouncementsTranslation();

  const onOpen = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <Box data-testid="announcements-context-menu">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={onOpen}
        data-testid="menu-button"
        color="inherit"
        className={classes.button}
      >
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList>
          <MenuItem onClick={() => navigate(announcementsLink())}>
            <ListItemIcon>
              <Description fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t('announcementsPage.contextMenu.admin')} />
          </MenuItem>
          <MenuItem onClick={() => navigate(categoriesLink())}>
            <ListItemIcon>
              <Description fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={t('announcementsPage.contextMenu.categories')}
            />
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
}
