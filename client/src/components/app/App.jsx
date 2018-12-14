import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ROUTES, routerRoutes } from '../../routes';

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Poiret+One|Source+Sans+Pro');

  #root {
    height: 100vh;
    margin: 0;
  }

  body {
    background-image: linear-gradient(to bottom right, rgb(50, 55, 68), rgb(18, 25, 30));
    color: ${({ theme }) => theme.secondary};
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

const theme = {
  primary: 'rgb(29, 33, 44)',
  secondary: 'rgb(203, 206, 208)',
  darksecondary: 'rgb(76, 81, 99)',
  accentlight: 'rgb(161, 224, 243)',
  accentcolor: 'rgb(116, 128, 250)'
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <>
          <Helmet>
            <title>Bitfrost</title>
            <link rel="icon" href="/src/assets/favicon.ico" />
            <link rel="manifest" href="/src/assets/manifest.json" />
          </Helmet>
          <GlobalStyle />
          <Switch>
            {routerRoutes()}
            <Redirect to={ROUTES.HOME.path} />
          </Switch>
        </>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
