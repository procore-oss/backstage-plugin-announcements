import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteRef } from '@backstage/core-plugin-api';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import makeStyles from '@mui/styles/makeStyles';
import Description from '@mui/icons-material/Description';
import MoreVert from '@mui/icons-material/MoreVert';
import { categoriesListRouteRef } from '../../routes';

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
});

export function ContextMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const categoriesLink = useRouteRef(categoriesListRouteRef);
  const navigate = useNavigate();

  const onOpen = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={onOpen}
        data-testid="menu-button"
        color="inherit"
        className={classes.button}
        size="large"
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
          <MenuItem onClick={() => navigate(categoriesLink())}>
            <ListItemIcon>
              <Description fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
