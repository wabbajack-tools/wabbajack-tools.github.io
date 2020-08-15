import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { observer, useLocalStore } from 'mobx-react';

import {
  AppBar,
  IconButton,
  Slide,
  useScrollTrigger,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';

import RoutedLink from './RoutedLink';

const drawerLinkStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

interface IHideOnScrollProps {
  children?: React.ReactElement<any, any>;
}

export const HideOnScroll: React.FC<IHideOnScrollProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = observer(() => {
  const localStore = useLocalStore(() => ({ isDrawerOpen: false }));

  const onClick = (open: boolean) => () => {
    localStore.isDrawerOpen = open;
  };

  const onKeyDown = (open: boolean) => (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Tab' || event.key === 'Shift') return;
    localStore.isDrawerOpen = open;
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={onClick(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={localStore.isDrawerOpen} onClose={onClick(false)}>
            <div
              id="drawer-div"
              role="presentation"
              onClick={onClick(false)}
              onKeyDown={onKeyDown(false)}
              style={{ width: '250px' }}
            >
              <List>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.gallery"
                    style={drawerLinkStyle}
                    underline="none"
                    color="textPrimary"
                  >
                    Gallery
                  </RoutedLink>
                </ListItem>
                <ListItem button key={uuidv4()} href="/status">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.status"
                    color="textPrimary"
                    style={drawerLinkStyle}
                    underline="none"
                  >
                    Status Dashboard
                  </RoutedLink>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <RoutedLink
            routeName="home"
            underline="none"
            color="textPrimary"
            style={{ ...drawerLinkStyle, marginLeft: '8px' }}
          >
            <Typography variant="button">Wabbajack</Typography>
          </RoutedLink>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default Header;
