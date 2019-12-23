import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import underscore from 'underscore';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import getGameName from 'Utils/games';

export default function GalleryCard(props) {
  const { modlist } = props;
  const { title, description, author, game, tags, links } = modlist;
  const { image, machineURL } = links;
  return (
    <Card>
      <CardHeader title={title} />
      <CardMedia component="img" alt={title} image={image} />
      <CardContent>
        <Typography variant="subtitle1">By {author}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
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
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" href={`/modlist/${machineURL}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

GalleryCard.propTypes = {
  modlist: PropTypes.object.isRequired
};
