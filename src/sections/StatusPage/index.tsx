import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import underscore from 'underscore';
import { ApplicationState } from '../../store';
import * as StatusStore from '../../store/DetailedStatusStore';
import { ModlistDetailedStatusItem } from '../../utils/modlist';
import { ReactAxiosComponent, AxiosError } from '../../utils/axios';
import { getDateString } from '../../utils/other';

import {
  Box,
  Container,
  Typography,
  Button,
  Link,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

type PropsFromRedux = ConnectedProps<typeof connector>;

type StatusPageProps = PropsFromRedux &
  typeof StatusStore.actionCreator &
  RouteComponentProps<{ url: string }>;

interface IVirtualizedListProps {
  list: ModlistDetailedStatusItem[];
}

export const VirtualizedList: React.FC<IVirtualizedListProps> = (props) => {
  const { list } = props;
  const renderRow = (stuff: ListChildComponentProps) => {
    const { index, style } = stuff;
    const item = list[index];
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={item.Archive.Name} />
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      itemCount={list.length}
      height={list.length >= 100 ? 400 : list.length * 20}
      width="100%"
      itemSize={20}
    >
      {renderRow}
    </FixedSizeList>
  );
};

export class StatusPage extends ReactAxiosComponent<StatusPageProps> {
  public ensureDataFetched() {
    this.props.requestDetailedStatus(
      `https://build.wabbajack.org/lists/status/${this.props.match.params.url}.json`
    );
  }

  public showLoading() {
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading status...</Typography>
        </React.Fragment>
      );
    }
  }

  public showError() {
    if (this.props.isLoading) return;

    if (this.props.error) {
      const error: AxiosError = this.props.error;
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
    if (this.props.isLoading || this.props.error) return;

    if (!this.props.status) {
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            Unable to find modlist with this URL: {this.props.match.params.url}
          </Typography>
        </React.Fragment>
      );
    }

    const { Name, Checked, HasFailures, Archives } = this.props.status;
    const date = new Date(Checked);
    const dateString = getDateString(date);

    const failing = underscore.filter(Archives, (archive) => {
      return archive.IsFailing;
    });
    const passing = underscore.filter(Archives, (archive) => {
      return !archive.IsFailing;
    });

    return (
      <React.Fragment>
        <Typography variant="h4">{Name}</Typography>
        <Container maxWidth="xl">
          <Typography variant="h6" color={HasFailures ? 'error' : 'secondary'}>
            Status: {HasFailures ? 'Failing' : 'Working'}
          </Typography>
          <Typography variant="h6">Last Checked: {dateString}</Typography>
          {HasFailures ? (
            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                Failing:{' '}
              </Typography>
              <VirtualizedList list={failing} />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <Typography variant="h6" style={{ margin: '8px 0' }}>
              Passing:{' '}
            </Typography>
            <VirtualizedList list={passing} />
          </div>
        </Container>
      </React.Fragment>
    );
  }

  public render() {
    return (
      <Box m={2} style={{ padding: '16px 0' }}>
        <Button href="/status">Back to the Dashboard</Button>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </Box>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => state.modlistStatus,
  StatusStore.actionCreator
);

export default connector(StatusPage as any);
