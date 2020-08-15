import { createMuiTheme } from '@material-ui/core/styles';

const white = '#FFFFFF';
const black = '#000000';

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

const whiteTheme = {
  primary: '#6200EE', // 500
  primaryVariant: '#3700B3', // 700
  secondary: '#03DAC6', // 200
  secondaryVariant: '#018786', // 900
  background: white,
  surface: white,
  error: '#B00020',
  onPrimary: white,
  onSecondary: black,
  onBackground: black,
  onSurface: black,
  onError: white,
};

const darkTheme = {
  primary: '#BB86FC', // 200
  primaryVariant: '#3700B3', // 700
  secondary: '#03DAC6', // 200
  secondaryVariant: '#03DAC6', // 200
  background: elevation0,
  surface: elevation0,
  error: '#CF6679',
  onPrimary: black,
  onSecondary: black,
  onBackground: white,
  onSurface: white,
  onError: black,
};

const createTheme = (theme) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: theme.primary,
        light: theme.primary,
        dark: theme.primaryVariant,
        contrastText: theme.onPrimary,
      },
      secondary: {
        main: theme.secondary,
        light: theme.secondary,
        dark: theme.secondaryVariant,
        contrastText: theme.onSecondary,
      },
      text: {
        primary: theme.onBackground,
        secondary: '#EEEEEE',
        disabled: '#DDDDDD',
      },
    },
    overrides: {
      MuiToolbar: {
        root: {
          backgroundColor: '#1F1B24',
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: '#AAAAAA',
        },
      },
      MuiCardHeader: {
        title: {
          textAlign: 'center',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: elevation24,
        },
      },
      MuiTypography: {
        h4: {
          textAlign: 'center',
          fontWeight: '200',
        },
        h5: {
          fontWeight: '400',
        },
        h6: {
          fontWeight: '300',
        },
        body1: {
          fontWeight: '200',
        },
      },
      MuiListItemIcon: {
        root: {
          color: white,
        },
      },
      MuiTableCell: {
        root: {
          backgroundColor: '#323232',
        },
      },
      MuiIcon: {
        colorDisabled: 'grey',
      },
      MuiIconButton: {
        colorDisabled: 'grey',
        root: {
          //color: 'white !important',
        },
      },
      MuiSvgIcon: {
        root: {
          //color: 'white !important',
        },
      },
      MuiSkeleton: {
        root: {
          backgroundColor: elevation4,
        },
      },
    },
  });
};

export {
  createTheme,
  whiteTheme,
  darkTheme,
  elevation0,
  elevation1,
  elevation2,
  elevation3,
  elevation4,
  elevation6,
  elevation8,
  elevation12,
  elevation16,
  elevation24,
};
