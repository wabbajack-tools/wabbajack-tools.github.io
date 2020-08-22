import * as React from 'react';
import { useObserver } from 'mobx-react';
import { useRouteNode } from 'react-router5';
import Markdown from 'markdown-to-jsx';
import { v4 as uuidv4 } from 'uuid';

import ErrorDisplay from '../../../components/ErrorDisplay';
import RoutedButton from '../../../components/RoutedButton';

import { useStores } from '../../../hooks/use-stores';
import { getGameName } from '../../../utils/games';
import options from '../../../utils/markdown.config';

import { Grid, Typography, Chip, Divider } from '@material-ui/core';

const ModlistInfoPage: React.FC = () => {
  const { machineURL } = useRouteNode('modlists.info').route.params;
  const { modlistsStore, modlistsInfoStore } = useStores();

  const UrlError = () => {
    if (!machineURL) return <ErrorDisplay message="Back URL!" />;
    return undefined;
  };

  const urlError = UrlError();

  if (urlError === undefined) {
    if (modlistsStore.shouldFetch()) {
      modlistsStore.fetchModlists();
    }
  }

  const loadingModlists = useObserver(() => {
    if (urlError !== undefined) return undefined;
    if (modlistsStore.isLoading.get('modlists') === true) {
      return <Typography>Loading Modlists</Typography>;
    }
    if (modlistsStore.axiosError) {
      return <ErrorDisplay axiosError={modlistsStore.axiosError} />;
    }
    if (modlistsStore.modlists === undefined) {
      return (
        <ErrorDisplay message="Fetched modlists without an error but array is still undefined!" />
      );
    }
    return undefined;
  });

  const loadingReadme = useObserver(() => {
    if (modlistsStore.modlists === undefined) return <React.Fragment />;

    const modlist = modlistsStore.modlists.find(
      (x) => x.links.machineURL === machineURL
    );

    if (modlist === undefined) {
      console.log(`machineURL: ${machineURL}`);
      console.log(`modlists: ${modlistsStore.modlists}`);
      return <ErrorDisplay message={`Unable to find modlist ${machineURL}!`} />;
    }

    if (modlist.links.readme.endsWith('.md')) {
      if (modlistsInfoStore.shouldFetch(machineURL)) {
        modlistsInfoStore.fetchReadme(machineURL, modlist.links.readme);
      }
    } else {
      return <React.Fragment />;
    }

    if (modlistsInfoStore.isLoading.get(machineURL) === true) {
      return <Typography>Loading Readme</Typography>;
    }

    if (modlistsInfoStore.axiosError) {
      return <ErrorDisplay axiosError={modlistsStore.axiosError} />;
    }

    const readme = modlistsInfoStore.readmeMap.get(machineURL);
    if (readme === undefined) {
      return (
        <ErrorDisplay message="Fetched readme without an error but item is still undefined!" />
      );
    }

    return undefined;
  });

  const content = useObserver(() => {
    if (loadingReadme) return undefined;
    const readme = modlistsInfoStore.readmeMap.get(machineURL);
    if (readme === undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;

    const modlist = modlistsStore.modlists.find(
      (x) => x.links.machineURL === machineURL
    );

    if (modlist === undefined) return undefined;

    const { title, description, version, author, game, tags, links } = modlist;
    const { image } = links;

    return (
      <React.Fragment>
        <Typography variant="h4" style={{ marginBottom: '8px' }}>
          {title}
        </Typography>
        <img
          alt={title}
          src={image}
          style={{ width: '100%', borderRadius: '1%' }}
        />
        <Typography variant="caption">
          Created by {author}, current version: {version}
        </Typography>
        <Grid container spacing={1}>
          <Grid item key={uuidv4()}>
            <Chip size="small" label={getGameName(game)} color="primary" />
          </Grid>
          {tags.map((tag) => {
            return (
              <Grid item key={uuidv4()}>
                <Chip size="small" label={tag} color="primary" />
              </Grid>
            );
          })}
        </Grid>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
        <Typography variant="subtitle2">{description}</Typography>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
        <Markdown
          options={options(window.location.hash, `${modlist.links.readme}`)}
        >
          {readme}
        </Markdown>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
      </React.Fragment>
    );
  });

  return useObserver(() => (
    <React.Fragment>
      <RoutedButton routeName="modlists.gallery">Back to Gallery</RoutedButton>
      {urlError}
      {loadingModlists}
      {loadingReadme}
      {content}
    </React.Fragment>
  ));
};

export default ModlistInfoPage;
