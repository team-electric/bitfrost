// react and react-router
import React from 'react';
import { Route, Link } from 'react-router-dom';

// site
import About from '../components/resources/site/About.jsx';
import Home from '../components/resources/site/Home.jsx';

// users
import UserCreate from '../components/resources/users/UserCreate.jsx';
import UserEdit from '../components/resources/users/UserEdit.jsx';
import { WithUser } from '../components/lib/WithUser.jsx';

// cars
import CarAdd from '../components/resources/cars/CarAdd.jsx';

// rides
import RideList from '../components/resources/rides/RideList.jsx';
import RideDisplay from '../components/resources/rides/RideDisplay.jsx';
import RidesPast from '../components/resources/rides/RidesPast.jsx';
import RidesUpcoming from '../components/resources/rides/RidesUpcoming.jsx';
import RideDetail from '../components/resources/rides/RideDetail.jsx';
import RideCreate from '../components/resources/rides/RideCreate.jsx';


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
  USER_CREATE: {
    path: '/signup',
    Component: WithUser(UserCreate),
    linkTo: () => '/signup'
  },
  USER_EDIT: {
    path: '/profile',
    Component: WithUser(UserEdit),
    linkTo: () => '/profile'
  },
  CAR_ADD: {
    path: '/carAdd',
    Component: WithUser(CarAdd),
    linkTo: () => '/carAdd'
  },
  RIDE_DISPLAY: {
    path: '/dashboard',
    Component: WithUser(RideDisplay),
    linkTo: () => '/dashboard'
  },
  RIDE_LIST: {
    path: '/rides',
    Component: WithUser(RideList),
    linkTo: () => '/rides',
  },
  RIDES_PAST: {
    path: '/ridespast',
    Component: WithUser(RidesPast),
    linkTo: () => '/ridespast'
  },
  RIDES_UPCOMING: {
    path: '/ridesUpcoming',
    Component: WithUser(RidesUpcoming),
    linkTo: () => '/ridesUpcoming'
  },
  RIDE_DETAIL: {
    path: '/ride/:id',
    Component: WithUser(RideDetail),
    linkTo: id => `/ride/${id}`
  },
  RIDE_CREATE: {
    path: '/createride',
    Component: WithUser(RideCreate),
    linkTo: () => '/createride'
  },
};

export const LINKS = [
  { label: 'Profile', path: '/profile' },
  { label: 'Dashboard', path: '/dashboard' }
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
