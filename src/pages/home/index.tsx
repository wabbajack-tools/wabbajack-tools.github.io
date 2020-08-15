import * as React from 'react';

import { Container, Typography, Button, Grid, Link } from '@material-ui/core';

import logo from '../../assets/img/wabbajack_transparent.webp';

import RoutedLink from '../../components/RoutedLink';

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
                href={process.env.WABBAJACKEXE}
                fullWidth
                color="secondary"
                variant="contained"
              >
                Download
              </Button>
            </Grid>
            <Grid item style={{ width: '30%' }}>
              <Button
                href={process.env.DISCORD_LINK}
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
          <RoutedLink routeName="modlists.gallery">Gallery</RoutedLink> to find
          a selection of curated Modlists.
        </Typography>
        <Typography variant="body1">
          Every Modlist comes with its own README containing information and
          instructions on how to install it correctly. You should definitely
          read the Modlist specific README if you want a successful
          installation.
        </Typography>
        <Typography variant="body1">
          The general procedure is download the Modlist which comes as a
          .wabbajack file, opening Wabbajack, clicking on the Install From Disk
          button, configuring Install and Download Location and hitting start.
        </Typography>
        <Typography variant="body1">
          Do note that installation can take anything from a few minutes to
          hours depending on the size of the Modlist, your Internet connection
          as well as your hardware. In the meantime you can take a look at some
          of the included mods of the Modlist in the Slideshow that is playing
          during installation.
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Compiling a Modlist</Typography>
        <Typography variant="body1">
          Modlist Creation or Compilation as we call it, is a trial and error
          process. You will likely get a decent amount of compilation errors in
          the beginning and have to spent some time fixing them before your
          first compilation succeeds. After that you can do incremental builds
          which take significantly less time and have close to zero errors
          compared to your first build.
        </Typography>
        <Typography variant="body1">
          To get started with creating your own Modlist read our guide{' '}
          <Link href="https://github.com/wabbajack-tools/wabbajack#creating-your-own-modlist">
            on GitHub
          </Link>
          .
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Troubleshooting</Typography>
        <Typography variant="body1">
          If you have trouble installing a Modlist, head over to our{' '}
          <Link href={process.env.DISCORD_LINK}>Discord</Link> and ask for help
          in the respective channels. If you installed a Modlist which is not in
          the gallery than ask the person who compiled it for support.{' '}
          <b>Do not ask for support on other Discord servers or on reddit!</b>
        </Typography>
      </Container>

      <Container style={{ marginTop: '16px' }}>
        <Typography variant="h5">Further Information:</Typography>
        <Typography variant="body1">
          <Link href="https://github.com/wabbajack-tools/wabbajack#wabbajack">
            GitHub Readme
          </Link>
        </Typography>
        <Typography variant="body1">
          For{' '}
          <Link href="https://github.com/wabbajack-tools/wabbajack#for-mod-authors">
            Mod Authors
          </Link>
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
          <Link href="https://github.com/wabbajack-tools/wabbajack/blob/master/CONTRIBUTING.md#contributing-to-wabbajack">
            Contributors
          </Link>
          .
        </Typography>
      </Container>
    </Container>
  );
};

export default HomePage;
