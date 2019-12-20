import { createMuiTheme } from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: teal
  },
  overrides: {
    MuiLink: {
      root: {
        color: teal.A400
      }
    }
  }
});

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
