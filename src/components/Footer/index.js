import React from 'react';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';

import FooterItem from './FooterItem';

export default function Footer() {
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  };

  const left = {
    float: 'left'
  };

  const right = {
    padding: '15px 0',
    margin: 0,
    float: 'right'
  };

  return (
    <footer>
      <Container>
        <div style={left}>
          <List style={flexContainer}>
            <FooterItem
              name="GitHub"
              link="https://github.com/wabbajack-tools/wabbajack"
            />
            <FooterItem name="Discord" link="https://discord.gg/wabbajack" />
            <FooterItem
              name="Patreon"
              link="https://www.patreon.com/user?u=11907933"
            />
          </List>
        </div>
        <div style={right}>
          &copy; {1900 + new Date().getYear()}, made by the{' '}
          <Link
            href="https://github.com/wabbajack-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wabbajack Team
          </Link>
        </div>
      </Container>
    </footer>
  );
}
