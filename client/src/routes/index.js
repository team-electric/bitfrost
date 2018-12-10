import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from '../components/resources/about/About.jsx';
import Home from '../components/resources/home/Home.jsx';
import Auth from '../components/resources/auth/Auth.jsx';
import SignUp from '../components/resources/signup/SignUp.jsx';

export const ROUTES = {
  ABOUT: {
    path: '/about/',
    Component: About,
    linkTo: () => '/about'
  },
  HOME: {
    path: '/home/',
    Component: Home,
    linkTo: () => '/home',
  },
  SIGNUP: {
    path: '/signup',
    Component: SignUp,
    linkTo: () => '/signup'
  },
  LOGIN: {
    path: '/login',
    Component: Auth,
    linkTo: () => '/login'
  }
};

export const LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Home', path: '/home' },
];

export const rootLinks = () => {
  return Object.keys(ROUTES)
    .filter(routeName => ROUTES[routeName].linkTo.length === 0)
    .map((routeName, i) => (
      <Link key={i} to={ROUTES[routeName].linkTo()}>{routeName.toLowerCase().replace('_', ' ')}</Link>
    ));
};

export const routerRoutes = () => {
  return Object.values(ROUTES)
    .map((route, i) => (
      <Route exact={route.linkTo.length === 0} key={i} path={route.path} component={route.Component} />
    ));
};
