import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route } from 'react-router';

import { ApplicationState } from 'store';
import * as ModlistStatusStore from 'store/ModlistStatusStore';

import { ModlistMetaData } from 'types/modlist';

import { ReactAxiosComponent } from 'types/axios';
import { Loading, Error, DataError } from 'components/Fetching';

import StatusDashboard from './Dashboard';
import ModlistStatus from './info/ModlistStatus';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  modlists: ModlistMetaData[];
}

type ModlistsStatusPageProps = OwnProps &
  typeof ModlistStatusStore.actionCreator &
  ModlistStatusStore.ModlistStatusState &
  PropsFromRedux;

export class ModlistsStatusPage extends ReactAxiosComponent<
  ModlistsStatusPageProps
> {
  ensureDataFetched(): void {
    this.props.requestStatusList();
  }

  showError(): JSX.Element | undefined {
    if (this.props.isLoading) return;
    if (!this.props.error) return;
    return <Error error={this.props.error} />;
  }

  showLoading(): JSX.Element | undefined {
    if (this.props.error) return;
    if (!this.props.isLoading) return;
    return <Loading message="Loading status from build server" />;
  }

  showContent(): JSX.Element | undefined {
    if (this.props.error) return;
    if (this.props.isLoading) return;

    if (!this.props.modlists) return <DataError />;
    if (this.props.modlists.length === 0) return <DataError />;

    if (!this.props.statusList) return <DataError />;
    if (this.props.statusList.length === 0) return <DataError />;

    return (
      <React.Fragment>
        <Route
          exact
          path="/modlists/status"
          render={() => <StatusDashboard statusList={this.props.statusList!} />}
        />
        <Route
          path="/modlists/status/:url"
          render={(props) => (
            <ModlistStatus {...props} modlists={this.props.modlists} />
          )}
        />
        <Route
          path="/modlists/status/search"
          render={() => <div>Search page</div>}
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
  (state: ApplicationState, ownProps: OwnProps) => ({
    ...state.modlistStatusList,
    ...ownProps,
  }),
  ModlistStatusStore.actionCreator
);

export default connector(ModlistsStatusPage as any);
