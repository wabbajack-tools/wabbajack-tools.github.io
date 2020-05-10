import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import _ from 'underscore';

import { ApplicationState } from 'store';
import * as StatusStore from 'store/DetailedStatusStore';

import { getDateString } from 'utils/other';
import { ModlistMetaData } from 'types/modlist';

import { ReactAxiosComponent } from 'types/axios';
import { Loading, Error, DataError } from 'components/Fetching';
import MaterialLink from 'components/MaterialLink';
import VirtualizedList from './VirtualizedList';

import { Typography } from '@material-ui/core';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  modlists: ModlistMetaData[];
}

type ModlistStatusProps = Props &
  typeof StatusStore.actionCreator &
  StatusStore.ModlistStatusState &
  PropsFromRedux &
  RouteComponentProps<{ url: string }>;

export class ModlistStatus extends ReactAxiosComponent<ModlistStatusProps> {
  ensureDataFetched(): void {
    this.props.requestDetailedStatus(this.props.match.params.url);
  }

  showError(): JSX.Element | undefined {
    if (this.props.isLoading) return;
    if (!this.props.error) return;
    return <Error error={this.props.error} />;
  }

  showLoading(): JSX.Element | undefined {
    if (this.props.error) return;
    if (!this.props.isLoading) return;
    return <Loading message="Loading Modlist Status" />;
  }

  showContent(): JSX.Element | undefined {
    if (this.props.error) return;
    if (this.props.isLoading) return;

    if (!this.props.modlists) return <DataError />;
    if (this.props.modlists.length === 0) return <DataError />;

    if (!this.props.status) return <DataError />;

    const { Name, Checked, HasFailures, Archives } = this.props.status;
    const date = new Date(Checked);
    const dateString = getDateString(date);

    const failing = _.filter(Archives, (archive) => {
      return archive.IsFailing;
    });

    const passing = _.filter(Archives, (archive) => {
      return !archive.IsFailing;
    });

    return (
      <React.Fragment>
        <Typography variant="h4">{Name}</Typography>
        <Typography variant="h6" color={HasFailures ? 'error' : 'secondary'}>
          Status: {HasFailures ? 'Failing' : 'Working'}
        </Typography>
        <Typography variant="h6">Last Checked: {dateString}</Typography>
        {HasFailures ? (
          <React.Fragment>
            <Typography variant="h6" style={{ marginBottom: '8px' }}>
              Failing:{' '}
            </Typography>
            <VirtualizedList list={failing} />
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
        <React.Fragment>
          <Typography variant="h6" style={{ margin: '8px 0' }}>
            Passing:{' '}
          </Typography>
          <VirtualizedList list={passing} />
        </React.Fragment>
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <MaterialLink href="/modlists/status">Back to Dashboard</MaterialLink>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  (state: ApplicationState, ownProps: Props) => ({
    ...state.modlistStatus,
    ...ownProps,
  }),
  StatusStore.actionCreator
);

export default connector(ModlistStatus as any);
