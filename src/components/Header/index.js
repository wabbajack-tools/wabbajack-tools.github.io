import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import {
  AppBar,
  ToolBar,
  IconButton,
  Button,
  Slide,
  useScrollTrigger,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

export default function Header() {
  const [state, setState] = React.useState({});
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <ToolBar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={state.left} onClose={toggleDrawer(false)}>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              style={{ width: '250px' }}
            >
              <List>
                <ListItem button key={uuid.v4()}>
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <Button
                    href="/gallery"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    disableTouchRipple
                  >
                    Gallery
                  </Button>
                </ListItem>
                <ListItem button key={uuid.v4()} href="/status">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <Button
                    href="/status"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    disableTouchRipple
                  >
                    Status Dashboard
                  </Button>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <Button disableRipple href="/">
            <Typography variant="button">Wabbajack</Typography>
          </Button>
        </ToolBar>
      </AppBar>
    </HideOnScroll>
  );
}
