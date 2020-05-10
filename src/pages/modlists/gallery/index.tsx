import * as React from 'react';
import { Route } from 'react-router';

import { ModlistMetaData } from 'types/modlist';

import Gallery from './Gallery';
import ModlistInfo from './info/ModlistInfo';

import { Container } from '@material-ui/core';

interface ModlistsGalleryPageProps {
  modlists: ModlistMetaData[];
  isLoading: boolean;
}

export class ModlistsGalleryPage extends React.PureComponent<
  ModlistsGalleryPageProps
> {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <Container
          maxWidth="lg"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <Route
            exact
            path="/modlists/gallery"
            render={() => (
              <Gallery
                modlists={this.props.modlists}
                isLoading={this.props.isLoading}
              />
            )}
          />
          <Route
            path="/modlists/gallery/:url"
            render={(props) => (
              <ModlistInfo {...props} modlists={this.props.modlists} />
            )}
          />
        </Container>
      </React.Fragment>
    );
  }
}
