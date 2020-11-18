import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
import theme from 'theme';
import TemporaryDrawer from 'components/Drawer';
import CustomizedSnackbars from 'components/SnackBar';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import { PersistGate } from 'redux-persist/lib/integration/react';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <TemporaryDrawer />
              <Routes />
            </BrowserRouter>
            <CustomizedSnackbars snackOpen snackMessage="teste" />
          </PersistGate>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
