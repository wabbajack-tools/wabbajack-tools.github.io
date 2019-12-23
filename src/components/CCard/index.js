import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';

const cardMedia = {
  width: '100%',
  display: 'inline-flex'
};

export default function CCard(props) {
  const { title, media, body, link, linkText, openNew } = props;
  return (
    <Card style={{ maxWidth: '345px' }}>
      <CardActionArea disableRipple disableTouchRipple>
        <CardMedia
          image={media}
          title={title}
          component="img"
          alt={title}
          style={cardMedia}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" style={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {openNew ? (
          <Button
            size="small"
            color="secondary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </Button>
        ) : (
          <Button size="small" color="secondary" href={link}>
            {linkText}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

CCard.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.any.isRequired,
  body: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  openNew: PropTypes.bool
};

CCard.defaultProps = {
  openNew: true
};
