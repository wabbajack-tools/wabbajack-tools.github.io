import * as React from 'react';

import { Button as MaterialButton, ButtonProps } from '@material-ui/core';

import { LinkRef, ConnectedLinkRef } from './RoutedComponent';

import { RouteName } from '../routes';

interface IRoutedButtonProps extends ButtonProps {
  routeName: RouteName;
  routeParams?: { [key: string]: any };
  connectedLink?: boolean;
}

const RoutedButton: React.FC<IRoutedButtonProps> = (props) => {
  if (props.connectedLink)
    return <MaterialButton component={ConnectedLinkRef} {...props} />;
  return <MaterialButton component={LinkRef} {...props} />;
};

export default RoutedButton;
