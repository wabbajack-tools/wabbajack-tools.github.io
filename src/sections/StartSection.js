import React from 'react';

import { Container, Grid, Paper, Typography, Link } from '@material-ui/core';

import config from 'Config';

import CCard from 'Components/CCard';

export default function StartSection() {
  return (
    <Grid container spacing={5} style={{ padding: '0 16px' }}>
      {/* TOP GRID */}

      <Grid item xs={12}>
        <Typography variant="h4">An automated Modlist installer</Typography>
        <Container maxWidth="lg" style={{ marginTop: '16px' }}>
          <Typography variant="body1">
            Modding requires a lot of knowledge and time. Most people do not
            have the time needed to mod their favorite games or do not want to
            go into hiding for the next three months for learning how to mod.
            But on the other hand, some of us spent decades honing their skills
            and investing hours into downloading, installing, testing, tweaking
            and playing with their setup. Wabbajack exists for everyone who just
            wants to play a fully modded game without investing a lot of time
            into modding.
          </Typography>
          <Typography variant="body1">
            Give Wabbajack a Mod Organizer 2 folder and profile or a Vortex
            installation and Wabbajack will generate a list of instructions to
            recreate the entire setup on another machine.
          </Typography>
        </Container>

        {/* INSALLING A MODLIST REQUIREMENTS */}

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
              <CCard
                title="Wabbajack"
                media={require('Assets/img/banner.png').default}
                body="You can download the latest release from GitHub"
                link="https://www.github.com/wabbajack-tools/wabbajack/releases"
                linkText="Download"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <CCard
                title="A Modlist"
                media={require('Assets/img/banner.png').default}
                body="We offer a list of currated Modlist on this Website in a gallery"
                link="/gallery"
                linkText="Browse"
                openNew={false}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <CCard
                title="Nexus Premium Account"
                media={require('Assets/img/nexus.png').default}
                body="The Nexus API only provides download links for Premium Accounts"
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
            <Link href={config.discord}>Discord</Link> and ask for help in the
            respective channels. If your installed a Modlist which is not in the
            gallery than ask the person who compiled it for support.{' '}
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
            For <Link href="/info/modlistauthors">Modlist Authors</Link>.
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

      {/* LEFT GRID
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Paper elevation={12}>Left</Paper>
      </Grid> */}

      {/* RIGHT GRID
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Paper elevation={12}>Right</Paper>
      </Grid> */}
    </Grid>
  );
}
