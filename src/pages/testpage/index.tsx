import * as React from 'react';
import { Link, ConnectedLink } from 'react-router5';
import { observer } from 'mobx-react';

import { useStores } from '../../hooks/use-stores';

import { Button, Container } from '@material-ui/core';

import RoutedLink from '../../components/RoutedLink';
import RoutedButton from '../../components/RoutedButton';

const TestPage = observer(() => {
  const { themeStore } = useStores();
  return (
    <Container>
      <Link routeName="test">Link: Go to /test</Link>
      <br></br>
      <Link routeName="test.lel">Link: Go to /test/lel</Link>
      <br></br>
      <ConnectedLink routeName="test">ConnectedLink: Go to /test</ConnectedLink>
      <br></br>
      <ConnectedLink routeName="test.lel">
        ConnectedLink: Go to /test/lel
      </ConnectedLink>
      <br></br>
      <RoutedLink routeName="test">RoutedLink: Go to /test</RoutedLink>
      <br></br>
      <RoutedLink routeName="test.lel">RoutedLink: Go to /test/lel</RoutedLink>
      <br></br>
      <RoutedButton routeName="test">RoutedButton: Go to /test</RoutedButton>
      <br></br>
      <RoutedButton routeName="test.lel">
        RoutedButton: Go to /test/lel
      </RoutedButton>
      <br></br>
      <Button color="primary" onClick={() => themeStore.toggleTheme()}>
        Toggle Theme Test
      </Button>
      <br></br>
    </Container>
  );
});

export default TestPage;
