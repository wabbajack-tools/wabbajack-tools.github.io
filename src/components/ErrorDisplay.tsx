import * as React from 'react';
import { AxiosError } from 'axios';

import { Typography } from '@material-ui/core';

interface IErrorDisplayProps {
  axiosError?: AxiosError;
  message?: string;
}

const ErrorDisplay: React.FC<IErrorDisplayProps> = (props) => {
  if (props.axiosError) {
    console.log(props.axiosError.request);
    console.log(props.axiosError.response);
    return (
      <React.Fragment>
        <Typography variant="h5">Axios Error:</Typography>
        <Typography variant="body1">{props.axiosError?.message}</Typography>
        <Typography variant="body1">
          Please report this error on our Discord. The error was logged to your
          console. You can open the console by pressing Ctrl+Shift+K on Firefox
          or Ctrl+Shift+J on Chrome.
        </Typography>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="h5">Error:</Typography>
      <Typography variant="body1">{props.message}</Typography>
      <Typography variant="body1">
        Please report this error on our Discord.
      </Typography>
    </React.Fragment>
  );
};

export default ErrorDisplay;
