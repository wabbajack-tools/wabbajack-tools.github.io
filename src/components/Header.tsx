import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import MaterialLink from './MaterialLink';

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

interface HideOnScrollProps {
  children?: React.ReactElement<any, any>;
}

const HideOnScroll: React.FC<HideOnScrollProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface HeaderState {
  left: boolean;
}

class Header extends React.PureComponent<{}, HeaderState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      left: false,
    };
  }

  private onClick = (open: boolean) => () => {
    this.setState({ ...this.state, left: open });
  };

  private onKeyDown = (open: boolean) => (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Tab' || event.key === 'Shift') return;

    this.setState({ ...this.state, left: open });
  };

  public render() {
    return (
      <HideOnScroll>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton
              id="Header-IconButton"
              edge="start"
              color="secondary"
              aria-label="menu"
              onClick={this.onClick(true).bind(this)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={this.state.left}
              onClose={this.onClick(false).bind(this)}
            >
              <div
                id="drawer-div"
                role="presentation"
                onClick={this.onClick(false).bind(this)}
                onKeyDown={this.onKeyDown(false).bind(this)}
                style={{ width: '250px' }}
              >
                <List>
                  <ListItem button key={uuidv4()}>
                    <ListItemIcon>
                      <AppsIcon />
                    </ListItemIcon>
                    <MaterialLink
                      href="/modlists/gallery"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                      disableTouchRipple
                    >
                      Gallery
                    </MaterialLink>
                  </ListItem>
                  <ListItem button key={uuidv4()} href="/status">
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <MaterialLink
                      href="/modlists/status"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                      disableTouchRipple
                    >
                      Status Dashboard
                    </MaterialLink>
                  </ListItem>
                </List>
              </div>
            </Drawer>
            <MaterialLink disableRipple href="/">
              <Typography variant="button">Wabbajack</Typography>
            </MaterialLink>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

export default Header;
