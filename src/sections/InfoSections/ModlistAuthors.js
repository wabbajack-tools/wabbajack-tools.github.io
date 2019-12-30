import React from 'react';

import { Container, Typography, Link } from '@material-ui/core';

export default function ModlistAuthors() {
  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: '16px', paddingBottom: '16px' }}
    >
      <Typography variant="h4">Information for Modlist Authors</Typography>
      <Typography variant="body2">
        <i>
          Before reading this section, make sure you have read the{' '}
          <Link href="/info/general">General Information</Link> page.
        </i>
      </Typography>
    </Container>
  );
}
