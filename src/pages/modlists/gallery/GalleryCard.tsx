import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getGameName } from '../../../utils/games';
import { IModlistMetadata } from '../../../types/modlists';

import RoutedButton from '../../../components/RoutedButton';

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

interface IModlistGalleryCardProps {
  modlist: IModlistMetadata;
}

const ModlistGalleryCard: React.FC<IModlistGalleryCardProps> = (props) => {
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
          {tags.map((tag) => {
            return (
              <Grid item key={uuidv4()}>
                <Chip size="small" label={tag} color="primary" />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions>
        <RoutedButton
          size="small"
          color="secondary"
          routeName="modlists.info"
          routeParams={{ machineURL }}
        >
          View
        </RoutedButton>
        <Grid container alignItems="flex-start" justify="flex-end">
          <RoutedButton
            routeName="modlists.search.single"
            routeParams={{ machineURL }}
          >
            Archive Search
          </RoutedButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ModlistGalleryCard;
