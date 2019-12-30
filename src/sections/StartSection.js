import React from 'react';

import { Container, Grid, Typography, Link } from '@material-ui/core';

import config from 'Config';

import CCard from 'Components/CCard';

export default function StartSection() {
  return (
    <Grid container spacing={5} style={{ padding: '0 16px' }}>
      {/* TOP GRID */}

      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          paddingTop: '160px',
          paddingBottom: '160px',
          alignItems: 'flex-start',
          flexDirection: 'row'
        }}
      >
        <img
          src={require('Assets/img/new/wabbajack_transparent.png').default}
          alt="logo"
          style={{ paddingRight: '64px', maxWidth: '300px' }}
        />
        <div>
          <Typography
            variant="h3"
            style={{
              fontWeight: '300',
              whiteSpace: 'nowrap'
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
              <CCard
                title="Wabbajack"
                media={require('Assets/img/new/banner.png').default}
                body="You can download the latest release from GitHub"
                link="https://www.github.com/wabbajack-tools/wabbajack/releases"
                linkText="Download"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <CCard
                title="A Modlist"
                media={require('Assets/img/new/banner.png').default}
                body="We offer a list of curated Modlist on this Website in a gallery"
                link="/gallery"
                linkText="Browse"
                openNew={false}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <CCard
                title="Nexus Premium Account"
                media={require('Assets/img/new/nexus.png').default}
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
            respective channels. If you installed a Modlist which is not in the
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
}
