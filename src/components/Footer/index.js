import React from 'react';
import List from '@material-ui/core/List';

import FooterItem from './FooterItem';

import 'Assets/css/components/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="left">
          <List className="left">
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
        <div className="right">
          &copy; {1900 + new Date().getYear()}, made by the{' '}
          <a
            href="https://github.com/wabbajack-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wabbajack Team
          </a>
        </div>
      </div>
    </footer>
  );
}
