/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import underscore from 'underscore';
import Markdown from 'markdown-to-jsx';
import { connect } from 'redux-zero/react';

import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider
} from '@material-ui/core';

import actions from 'Src/store/actions';

import getGameName from 'Utils/games';
import options from 'Utils/markdown.config';

const mapToProps = ({ modlists, readme }) => ({ modlists, readme });

class Modlist extends Component {
  componentDidMount() {
    if (this.props.modlists.length === 0) {
      this.props.loadModlists();
    } else {
      const modlist = underscore.find(this.props.modlists, current => {
        return current.links.machineURL === this.props.url.match.params.url;
      });
      if (modlist !== undefined && this.props.readme !== undefined)
        this.props.fetchReadme(modlist.links.readme);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    const modlist = underscore.find(this.props.modlists, current => {
      return current.links.machineURL === this.props.url.match.params.url;
    });
    if (modlist !== undefined && this.props.readme !== undefined)
      this.props.fetchReadme(modlist.links.readme);
  }

  render() {
    const { url } = this.props.url.match.params;
    const { modlists } = this.props;
    let cModlist = null;

    underscore.map(modlists, modlist => {
      if (modlist.links.machineURL === url) cModlist = modlist;
    });

    if (cModlist == null)
      return (
        <div>
          <h1>{url} not found</h1>
        </div>
      );

    const { title, description, version, author, game, tags, links } = cModlist;
    const { image, download } = links;

    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Button href="/gallery">Back to Gallery</Button>
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
          <Grid item key={uuid.v4()}>
            <Chip size="small" label={getGameName(game)} color="primary" />
          </Grid>
          {underscore.map(tags, tag => {
            return (
              <Grid item key={uuid.v4()}>
                <Chip size="small" label={tag} color="primary" />
              </Grid>
            );
          })}
        </Grid>

        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />

        <Typography variant="subtitle2">{description}</Typography>

        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />

        <Markdown options={options}>{this.props.readme}</Markdown>

        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />

        <Button href={download} color="secondary">
          Download
        </Button>
      </Container>
    );
  }
}

Modlist.propTypes = {
  url: PropTypes.object.isRequired,
  loadModlists: PropTypes.func.isRequired,
  fetchReadme: PropTypes.func.isRequired,
  modlists: PropTypes.array.isRequired,
  readme: PropTypes.string.isRequired
};

export default connect(mapToProps, actions)(Modlist);
