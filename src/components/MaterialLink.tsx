import * as React from 'react';
import { Link as RoutedLink } from 'react-router-dom';

import { Button, ButtonProps, Link } from '@material-ui/core';

interface Props {
  href: string;
  disableScroll?: boolean;
  isLink?: boolean;
}

type MaterialLinkProps = ButtonProps & Props;

//https://material-ui.com/guides/composition/#routing-libraries
//https://reacttraining.com/react-router/web/api/Link
const MaterialLink: React.FC<MaterialLinkProps> = (props) => {
  const onClick = () => {
    if (!props.disableScroll) window.scrollTo(0, 0);
  };

  if (props.isLink) {
    return (
      <Link component={RoutedLink} to={props.href} onClick={onClick}>
        {props.children}
      </Link>
    );
  }

  return (
    <Button component={RoutedLink} to={props.href} onClick={onClick}>
      {props.children}
    </Button>
  );
};

export default MaterialLink;
