import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const cardMedia = {
  width: '100%',
  display: 'inline-flex'
};

export default function CCard(props) {
  const { title, media, body, link, linkText } = props;
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
        <Button
          size="small"
          color="secondary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </Button>
      </CardActions>
    </Card>
  );
}

CCard.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};
