import * as React from 'react';
import { Route } from 'react-router';

import { ModlistMetaData } from 'types/modlist';

import Search from './Search';

import { Container } from '@material-ui/core';

interface ModlistsSearchPageProps {
  modlists: ModlistMetaData[];
}

export class ModlistSearchPage extends React.PureComponent<
  ModlistsSearchPageProps
> {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <Container
          maxWidth="lg"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <Route
            path="/modlists/search/:url"
            render={(props) => (
              <Search modlists={this.props.modlists} {...props} />
            )}
          />
        </Container>
      </React.Fragment>
    );
  }
}
