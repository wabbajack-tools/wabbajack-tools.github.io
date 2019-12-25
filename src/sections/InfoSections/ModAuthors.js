import React from 'react';

import { Container, Typography, Link } from '@material-ui/core';

export default function ModAuthors() {
  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: '16px', paddingBottom: '16px' }}
    >
      <Typography variant="h4">Information for Mod Authors</Typography>
      <Typography variant="body2" component="i">
        Before reading this section, make sure you have read the{' '}
        <Link href="/info/general">General Information</Link> page.
      </Typography>
      <Typography variant="body1" style={{ paddingTop: '8px' }}>
        Depending on what modding scene you came from, you may have different
        experiences with <i>Modpacks</i>, <i>Modlists</i> and{' '}
        <i>Automated Installers</i>. It is important to understand what and how
        Wabbajack does before doing anything stupid like going onto
        reddit/Discord/GMAD and complaining about a program you have never used
        nor understand how it operates (ok boomer).
      </Typography>
    </Container>
  );
}
