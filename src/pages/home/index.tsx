import * as React from 'react';

import MaterialLink from 'components/MaterialLink';

import { Container, Typography, Link, Button, Grid } from '@material-ui/core';

import logo from 'assets/img/wabbajack_transparent.webp';

const HomePage: React.FC = () => {
  return (
    <Container>
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
          <Typography variant="h6" style={{ textTransform: 'none' }}>
            Wabbajack can reproduce an entire modding setup on another machine
            <b> without bundling any assets or re-distributing any mods</b>.
          </Typography>
          <Grid
            alignContent="flex-start"
            alignItems="flex-start"
            direction="row"
            container
            justify="space-between"
            style={{
              marginTop: '16px',
            }}
          >
            <Grid item style={{ width: '55%' }}>
              <Button
                href="https://github.com/wabbajack-tools/wabbajack/releases"
                fullWidth
                color="secondary"
                variant="contained"
              >
                Download
              </Button>
            </Grid>
            <Grid item style={{ width: '30%' }}>
              <Button
                href={process.env.REACT_APP_DISCORD_LINK}
                fullWidth
                color="secondary"
                variant="outlined"
              >
                Discord
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Installing a Modlist</Typography>
        <Typography variant="body1">
          The process of installing a Modlist is designed to be as quick as
          possible. If you haven't already found a Modlist you want to install,
          you can head over to our{' '}
          <MaterialLink href="/modlists/gallery" isLink>
            Gallery
          </MaterialLink>{' '}
          to find a selection of curated Modlists.
        </Typography>
        <Typography variant="body1">
          The readme of each Modlist will take you through the entire process on
          how to correctly install it. Most of the time it's just a matter of
          having a clean game installation, loading the Modlist in Wabbajack and
          pressing the start button.
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Compiling a Modlist</Typography>
        <Typography variant="body1">
          Compiling/Creating a Modlist with Wabbajack is similar to installing
          one in the sense that you don't really have to do anything in
          Wabbajack itself. You do need good preparation if you want the
          compilation to succeed.
        </Typography>
        <Typography variant="body1">
          To get started with creating your own Modlist, check the{' '}
          <MaterialLink href="/info/general" isLink>
            General Information
          </MaterialLink>{' '}
          page on how Wabbajack works and read our guide{' '}
          <Link href="https://github.com/wabbajack-tools/wabbajack#creating-your-own-modlist">
            here
          </Link>
          .
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Troubleshooting</Typography>
        <Typography variant="body1">
          If you have trouble installing a Modlist, head over to our{' '}
          <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link> and ask
          for help in the respective channels. If you installed a Modlist which
          is not in the gallery than ask the person who compiled it for support.{' '}
          <b>Do not ask for support on other Discord servers or on reddit!</b>
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Further Information:</Typography>
        <Typography variant="body1">
          <MaterialLink isLink href="/info/general">
            General Information
          </MaterialLink>{' '}
          about how Wabbajack works.
        </Typography>
        <Typography variant="body1">
          For{' '}
          <MaterialLink isLink href="/info/modauthors">
            Mod Authors
          </MaterialLink>
          .
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
    </Container>
  );
};

export default HomePage;
