import * as React from 'react';
import { useRoute } from 'react-router5';

import { RouteName } from '../routes';

interface IRouteProps {
  name: RouteName;
  component: JSX.Element;
  exact?: boolean;
}

const Route: React.FC<IRouteProps> = (props) => {
  const { route } = useRoute();
  if (!route) return <React.Fragment />;
  if (route.name === props.name) return props.component;
  if (props.exact) return <React.Fragment />;
  if (route.name.startsWith(props.name)) return props.component;
  return <React.Fragment />;
};

export default Route;
