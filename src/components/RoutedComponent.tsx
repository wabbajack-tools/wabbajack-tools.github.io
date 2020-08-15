import * as React from 'react';
import { Link, ConnectedLink } from 'react-router5';

const LinkRef = React.forwardRef((props, ref) => <Link {...props} />);
const ConnectedLinkRef = React.forwardRef((props, ref) => (
  <ConnectedLink {...props} />
));

export { LinkRef, ConnectedLinkRef };
