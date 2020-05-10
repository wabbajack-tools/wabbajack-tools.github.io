import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import underscore from 'underscore';

import { getGameName } from 'utils/games';
import { ModlistMetaData } from 'types/modlist';

import MaterialLink from 'components/MaterialLink';

import { Skeleton } from '@material-ui/lab';

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
} from '@material-ui/core';

interface ModlistGalleryCardProps {
  modlist: ModlistMetaData;
}

const ModlistGalleryCard: React.FC<ModlistGalleryCardProps> = (props) => {
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
        <MaterialLink
          size="small"
          color="secondary"
          href={`/modlists/gallery/${machineURL}`}
        >
          View
        </MaterialLink>
      </CardActions>
    </Card>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <Card style={{ width: '100%' }}>
      <CardHeader
        component={Skeleton}
        animation={false}
        variant="text"
        height={50}
        style={{ marginLeft: '4px', marginRight: '4px' }}
      />
      <CardMedia
        component={Skeleton}
        animation={false}
        variant="rect"
        height={300}
      />
      <CardContent>
        <Skeleton animation={false} variant="text" height={100} />
      </CardContent>
    </Card>
  );
};

export default ModlistGalleryCard;
