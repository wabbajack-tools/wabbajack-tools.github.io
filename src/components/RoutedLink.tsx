import * as React from 'react';

import { Link as MaterialLink, LinkProps } from '@material-ui/core';

import { LinkRef, ConnectedLinkRef } from './RoutedComponent';

import { RouteName } from '../routes';

interface IRoutedLinkProps extends LinkProps {
  routeName: RouteName;
  routeParams?: { [key: string]: any };
  connectedLink?: boolean;
}

const RoutedLink: React.FC<IRoutedLinkProps> = (props) => {
  if (props.connectedLink)
    return <MaterialLink component={ConnectedLinkRef} {...props} />;
  return <MaterialLink component={LinkRef} {...props} />;
};

export default RoutedLink;
