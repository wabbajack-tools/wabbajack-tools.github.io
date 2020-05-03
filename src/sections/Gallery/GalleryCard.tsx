import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import underscore from 'underscore';
import getGameName from '../../utils/games';
import { ModlistMetaData } from '../../utils/modlist';

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Grid,
  Chip,
  Button,
} from '@material-ui/core';

interface IProps {
  modlist: ModlistMetaData;
}

export const GalleryCard: React.FC<IProps> = (props) => {
  const { modlist } = props;
  const { title, description, author, game, tags, links, nsfw } = modlist;
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
          <Grid item key={uuidv4()}>
            <Chip size="small" label={getGameName(game)} color="primary" />
          </Grid>
          {nsfw ? (
            <Grid item key={uuidv4()}>
              <Chip size="small" label="NSFW" color="primary" />
            </Grid>
          ) : (
            <div></div>
          )}
          {underscore.map(tags, (tag) => {
            return (
              <Grid item key={uuidv4()}>
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
};

export default GalleryCard;
