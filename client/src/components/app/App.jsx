import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { ROUTES, routerRoutes } from '../../routes';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: BOMBARD;
    src: url("/src/assets/fonts/BOMBARD.ttf") format("truetype");
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    text-align: center;
    margin: 0;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    font-family: sans-serif;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
`;

const theme = {
  primary: 'rgb(0, 153, 255)',
  secondary: 'rgb(255, 255, 0)',
  darksecondary: 'rgb(107, 48, 13)',
  accent: 'rgb(173, 38, 36)'
};

// Add redirect to routes?
// <Redirect to={ROUTES.HOME.path} />

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <>
          <Helmet>
            <title>Bitfrost</title>
            <link rel="icon" href="/src/assets/favicon.ico"/>
            <link rel="manifest" href="/src/assets/manifest.json"/>
          </Helmet>
          <GlobalStyle/>
          <Header/>
          <Switch>
            {routerRoutes()}
            <Redirect to={ROUTES.HOME.path} />
          </Switch>
          <Footer/>
        </>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
