import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';

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
