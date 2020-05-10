import * as React from 'react';

import { Container, List, ListItem, Link, Tooltip } from '@material-ui/core';

const flexContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

const left: React.CSSProperties = {
  float: 'left',
};

const right: React.CSSProperties = {
  padding: '15px 0',
  margin: 0,
  float: 'right',
};

interface FooterItemProps {
  link: string | undefined;
  name: string;
}

export const FooterItem: React.FC<FooterItemProps> = (props) => {
  const { link, name } = props;
  return (
    <ListItem>
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </Link>
    </ListItem>
  );
};

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <div style={left}>
          <List style={flexContainer}>
            <FooterItem
              name="GitHub"
              link="https://github.com/wabbajack-tools/wabbajack"
            />
            <FooterItem
              name="Discord"
              link={process.env.REACT_APP_DISCORD_LINK}
            />
            <FooterItem
              name="Patreon"
              link="https://www.patreon.com/user?u=11907933"
            />
            <FooterItem
              name="Reddit"
              link="https://www.reddit.com/r/wabbajack/"
            />
          </List>
        </div>
        <div style={right}>
          &copy; 2019 - {new Date().getFullYear()}, made by the{' '}
          <Tooltip
            title="Website actually only made by erri120 :p (don't tell anyone)"
            enterDelay={10000}
          >
            <Link
              href="https://github.com/wabbajack-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wabbajack Team
            </Link>
          </Tooltip>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
