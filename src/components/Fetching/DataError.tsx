import * as React from 'react';

import { Typography, Link } from '@material-ui/core';

const DataError: React.FC = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6">Error</Typography>
      <Typography variant="body1">
        Data fetched is corrupted. Please report this on the{' '}
        <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord server</Link>.
      </Typography>
      {props.children}
    </React.Fragment>
  );
};

export default DataError;
