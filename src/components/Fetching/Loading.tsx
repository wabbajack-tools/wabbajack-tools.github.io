import * as React from 'react';

import { Typography } from '@material-ui/core';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{props.message}</Typography>
      {props.children}
    </React.Fragment>
  );
};

export default Loading;
