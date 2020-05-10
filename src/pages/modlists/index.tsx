import * as React from 'react';
import { Route } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';

import { ApplicationState } from 'store';
import * as ModlistsStore from 'store/ModlistsStore';

import { ReactAxiosComponent } from 'types/axios';
import { Error, DataError } from 'components/Fetching';
import { ModlistsGalleryPage } from './gallery';
import ModlistsStatusPage from './status';

type PropsFromRedux = ConnectedProps<typeof connector>;

type ModlistsPageProps = PropsFromRedux & typeof ModlistsStore.actionCreator;

export class ModlistsPage extends ReactAxiosComponent<ModlistsPageProps> {
  ensureDataFetched(): void {
    this.props.requestModlists();
  }

  showError(): JSX.Element | undefined {
    if (this.props.isLoading) return;
    if (!this.props.error) return;
    return <Error error={this.props.error} />;
  }

  showLoading(): JSX.Element | undefined {
    if (this.props.error) return;
    if (!this.props.isLoading) return;
    return (
      <React.Fragment>
        <Route
          path="/modlists/gallery"
          render={() => (
            <ModlistsGalleryPage
              modlists={[]}
              isLoading={this.props.isLoading}
            />
          )}
        />
      </React.Fragment>
    );
  }

  showContent(): JSX.Element | undefined {
    if (this.props.error) return;
    if (this.props.isLoading) return;

    if (!this.props.modlists) return <DataError />;
    if (this.props.modlists.length === 0) return <DataError />;

    return (
      <React.Fragment>
        <Route
          path="/modlists/gallery"
          render={() => (
            <ModlistsGalleryPage
              modlists={this.props.modlists!}
              isLoading={this.props.isLoading}
            />
          )}
        />
        <Route
          path="/modlists/status"
          render={() => <ModlistsStatusPage modlists={this.props.modlists!} />}
        />
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => state.modlists,
  ModlistsStore.actionCreator
);

export default connector(ModlistsPage as any);
