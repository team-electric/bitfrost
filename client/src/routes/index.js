import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from '../components/resources/about/About.jsx';
import Home from '../components/resources/home/Home.jsx';
import SignUp from '../components/resources/signup/SignUp.jsx';
import RideList from '../components/resources/rides/RideList.jsx';

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
  RIDE_LIST: {
    path: '/rides',
    Component: RideList,
    linkTo: () => '/rides',
  },
};

export const LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Home', path: '/home' },
  { label: 'Rides', path: '/rides' },
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
