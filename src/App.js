import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import theme from './theme';
import TemporaryDrawer from './components/Drawer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <TemporaryDrawer />
          <Routes />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
