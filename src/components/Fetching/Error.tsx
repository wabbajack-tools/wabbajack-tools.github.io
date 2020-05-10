import * as React from 'react';

import { AxiosError } from 'types/axios';

import { Typography, Link } from '@material-ui/core';

interface ErrorProps {
  error: AxiosError;
}

const Error: React.FC<ErrorProps> = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6">Error</Typography>
      <Typography variant="body1">
        An error occurred while fetching data. Please report this on the{' '}
        <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord server</Link>.
      </Typography>
      <Typography variant="subtitle1">
        Message: {props.error.message}
      </Typography>
      {props.children}
    </React.Fragment>
  );
};

export default Error;
