import * as React from 'react';

import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Link,
} from '@material-ui/core';

import logo from '../assets/img/wabbajack_transparent.webp';
import banner from '../assets/img/banner.webp';
import nexus from '../assets/img/nexus.webp';

interface ICardProps {
  title: string;
  media: string;
  body: string;
  link: string;
  linkText: string;
  openNew?: boolean;
}

export const CustomCard: React.FC<ICardProps> = (props) => {
  const { title, media, body, link, linkText, openNew } = props;
  return (
    <Card style={{ maxWidth: '345px' }}>
      <CardActionArea disableRipple disableTouchRipple>
        <CardMedia
          image={media}
          title={title}
          component="img"
          alt={title}
          style={{
            width: '100%',
            display: 'inline-flex',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" style={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {openNew ? (
          <Button
            size="small"
            color="secondary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </Button>
        ) : (
          <Button size="small" color="secondary" href={link}>
            {linkText}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default () => (
  <Grid container spacing={5} style={{ padding: '0 16px' }}>
    {/* TOP GRID */}

    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        paddingTop: '160px',
        paddingBottom: '160px',
        alignItems: 'flex-start',
        flexDirection: 'row',
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{ paddingRight: '64px', maxWidth: '300px' }}
      />
      <div>
        <Typography
          variant="h3"
          style={{
            fontWeight: 300,
            whiteSpace: 'nowrap',
          }}
        >
          Wabbajack
        </Typography>
        <Typography variant="h5">An automated Modlist Installer</Typography>
        <Typography variant="h5">
          Wabbajack can reproduce an entire modding setup on another machine
          <b> without bundling any assets or re-distributing any mods</b>.
        </Typography>
      </div>
    </Container>

    <Grid item xs={12}>
      {/* INSTALLING A MODLIST REQUIREMENTS */}
      <Container maxWidth="lg" style={{ marginTop: '16px' }}>
        <Typography variant="h6">
          Requirements for installing a Modlist:
        </Typography>
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <CustomCard
              title="Wabbajack"
              media={banner}
              body="You can download the latest release from GitHub"
              link="https://www.github.com/wabbajack-tools/wabbajack/releases"
              linkText="Download"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <CustomCard
              title="A Modlist"
              media={banner}
              body="We offer a list of curated Modlist on this Website in a gallery"
              link="/gallery"
              linkText="Browse"
              openNew={false}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <CustomCard
              title="Nexus Premium Account (Optional)"
              media={nexus}
              body="The Nexus API only provides download links for Premium Accounts. We have recently added the option to manually download all mods using our internal browser."
              link="https://forums.nexusmods.com/index.php?/store/category/1-premium-membership/"
              linkText="Buy"
            />
          </Grid>
        </Grid>
      </Container>

      {/* TROUBLESHOOTING */}

      <Container maxWidth="lg" style={{ marginTop: '16px' }}>
        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
          Troubleshooting
        </Typography>
        <Typography variant="body1">
          If you have trouble installing a Modlist, head over to our{' '}
          <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link> and ask
          for help in the respective channels. If you installed a Modlist which
          is not in the gallery than ask the person who compiled it for support.{' '}
          <b>Do not ask for support on other Discord servers or on reddit!</b>
        </Typography>
      </Container>

      {/* FURTHER INFORMATION */}

      <Container maxWidth="lg" style={{ marginTop: '16px' }}>
        <Typography variant="h6" style={{ marginBottom: '8px' }}>
          Further Information:
        </Typography>
        <Typography variant="body1">
          <Link href="/info/general">General Information</Link> about how
          Wabbajack works.
        </Typography>
        <Typography variant="body1">
          For <Link href="/info/modauthors">Mod Authors</Link>.
        </Typography>
        <Typography variant="body1">
          For{' '}
          <Link href="https://github.com/wabbajack-tools/wabbajack#creating-your-own-modlist">
            Modlist Authors
          </Link>
          .
        </Typography>
        <Typography variant="body1">
          For{' '}
          <Link href="https://github.com/wabbajack-tools/wabbajack/blob/master/CONTRIBUTING.md">
            Contributors
          </Link>
          .
        </Typography>
      </Container>
      {/* TOP GRID END */}
    </Grid>
  </Grid>
);
