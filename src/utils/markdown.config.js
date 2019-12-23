import { Typography, Link } from '@material-ui/core';

const h4 = {
  component: Typography,
  props: {
    variant: 'h4',
    style: {
      marginTop: '8px',
      marginBottom: '8px'
    }
  }
};

const h5 = {
  component: Typography,
  props: {
    variant: 'h5',
    style: {
      marginTop: '4px',
      marginBottom: '4px'
    }
  }
};

const options = {
  overrides: {
    h1: h4,
    h2: h4,
    h3: h5,
    h4: h5,
    h5,
    h6: {
      component: Typography,
      props: {
        variant: 'h6'
      }
    },
    p: {
      component: Typography,
      props: {
        variant: 'body2'
      }
    },
    a: {
      component: Link
    },
    img: {
      props: {
        style: {
          width: '100%',
          marginTop: '8px',
          marginBottom: '8px'
        }
      }
    }
  }
};

export default options;
