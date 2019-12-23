import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  ToolBar,
  Button,
  Slide,
  useScrollTrigger,
  Typography
} from '@material-ui/core';

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
  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <ToolBar variant="dense">
          <Button disableRipple href="/">
            <Typography variant="button" color="textPrimary">
              Wabbajack
            </Typography>
          </Button>
        </ToolBar>
      </AppBar>
    </HideOnScroll>
  );
}
