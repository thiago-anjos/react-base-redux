import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import { blue, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: indigo[500],
    },
    success: {
      main: blue[700],
    },
    error: {
      main: red[900],
    },
    grey: {
      main: grey[500],
    },
  },
  typography: {
    fontFamily: '"Ubuntu sans-serif"',
  },
});

theme.overrides = {
  ...theme.overrides,
  MuiCssBaseline: {
    '@global': {
      html: {
        padding: '0',
        margin: '0',
        outline: 'none',
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: 'Ubuntu sans-serif',
        backgroundColor: theme.palette.grey.main,
        WebkitFontSmoothing: 'auto',
      },
      a: {
        textDecoration: 'none',
        color: theme.palette.error.main,
      },
    },
  },
};

export default theme;
