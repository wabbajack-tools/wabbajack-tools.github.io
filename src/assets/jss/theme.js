// This is the global material-ui theme

import { createMuiTheme } from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';

const primary = deepPurple;
const secondary = teal;
const tertiary = cyan;

const elevation0 = '#121212';
const elevation1 = '#1E1E1E';
const elevation2 = '#222222';
const elevation3 = '#242424';
const elevation4 = '#272727';
const elevation6 = '#2C2C2C';
const elevation8 = '#2D2D2D';
const elevation12 = '#323232';
const elevation16 = '#353535';
const elevation24 = '#383838';

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    text: {
      primary: '#FFFFFF',
      secondary: '#EEEEEE',
      disabled: '#DDDDDD'
    }
  },
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: '#AAAAAA'
      }
    },
    MuiLink: {
      root: {
        color: teal.A400
      }
    },
    MuiCardHeader: {
      title: {
        textAlign: 'center',
        color: green.A400
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: elevation24
      }
    },
    MuiTypography: {
      h3: {
        color: tertiary.A400
      },
      h4: {
        color: tertiary.A400,
        textAlign: 'center'
      }
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: deepPurple[900],
        color: '#FFFFFF'
      }
    }
  }
});

export {
  theme,
  elevation0,
  elevation1,
  elevation2,
  elevation3,
  elevation4,
  elevation6,
  elevation8,
  elevation12,
  elevation16,
  elevation24
};
