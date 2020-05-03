import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import underscore from 'underscore';
import { ApplicationState } from '../../store';
import * as StatusStore from '../../store/ModlistStatusStore';
import { ModlistStatus } from '../../utils/modlist';
import { ReactAxiosComponent } from '../../utils/axios';

import { Box, Container, Grid, Typography, Link } from '@material-ui/core';

import StatusCard from './StatusCard';

type PropsFromRedux = ConnectedProps<typeof connector>;

type StatusDashboardProps = PropsFromRedux & typeof StatusStore.actionCreator;

export class StatusDashboard extends ReactAxiosComponent<StatusDashboardProps> {
  public ensureDataFetched() {
    this.props.requestStatusList();
  }

  public showLoading() {
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading status list...</Typography>
        </React.Fragment>
      );
    }
  }

  public showError() {
    if (this.props.error) {
      const error = this.props.error;
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            An error occurred while loading the modlists. Please report this on
            the <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link>{' '}
            server.
          </Typography>
          <Typography variant="subtitle1">Message: {error.message}</Typography>
        </React.Fragment>
      );
    }
  }

  public showContent() {
    if (!this.props.statusList || this.props.error || this.props.isLoading)
      return;

    const failed: Array<ModlistStatus> = underscore
      .chain(this.props.statusList)
      .filter((status) => status.has_failures)
      .sortBy((status) => status.name)
      .value();

    const success: Array<ModlistStatus> = underscore
      .chain(this.props.statusList)
      .filter((status) => !status.has_failures)
      .sortBy((status) => status.name)
      .value();

    return (
      <React.Fragment>
        <Container maxWidth="xl">
          <Typography variant="h6">
            Failing Modlists: {failed.length}
          </Typography>
          <Typography variant="h6">
            Working Modlists: {success.length}
          </Typography>
        </Container>
        <Grid container direction="row" spacing={3}>
          {underscore.map(failed, (status: ModlistStatus) => {
            return (
              <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
                <StatusCard status={status} />
              </Grid>
            );
          })}
          {underscore.map(success, (status: ModlistStatus) => {
            return (
              <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
                <StatusCard status={status} />
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }

  public render() {
    return (
      <Box m={2}>
        <Typography variant="h4" style={{ paddingTop: '8px' }}>
          Modlist Status
        </Typography>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </Box>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => state.modlistStatusList,
  StatusStore.actionCreator
);

export default connector(StatusDashboard as any);
