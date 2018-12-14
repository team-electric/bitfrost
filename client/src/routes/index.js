import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from '../components/resources/About.jsx';
import Home from '../components/resources/Home.jsx';
import SignUp from '../components/resources/SignUp.jsx';
import RideList from '../components/resources/rides/RideList.jsx';
import Dashboard from '../components/resources/Dashboard.jsx';
import Profile from '../components/resources/Profile.jsx';
import PastTrips from '../components/resources/trips/PastTrips.jsx';
import UpcomingTrips from '../components/resources/trips/UpcomingTrips.jsx';
import TripDetail from '../components/resources/TripDetail.jsx';
import AddCar from '../components/resources/AddCar.jsx';
import CreateTrip from '../components/resources/CreateTrip.jsx';
import Test from '../components/resources/Test.jsx';

import { WithUser } from '../components/lib/WithUser.jsx';

import MarkerMap from '../components/resources/maps/MarkerMap.jsx';
import SearchMap from '../components/resources/maps/SearchMap.jsx';


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
    Component: WithUser(SignUp),
    linkTo: () => '/signup'
  },
  RIDE_LIST: {
    path: '/rides',
    Component: WithUser(RideList),
    linkTo: () => '/rides',
  },
  DASHBOARD: {
    path: '/dashboard',
    Component: WithUser(Dashboard),
    linkTo: () => '/dashboard'
  },
  PROFILE: {
    path: '/profile',
    Component: WithUser(Profile),
    linkTo: () => '/profile'
  },
  PASTTRIPS: {
    path: '/pasttrips',
    Component: WithUser(PastTrips),
    linkTo: () => '/pasttrips'
  },
  UPCOMINGTRIPS: {
    path: '/upcomingtrips',
    Component: WithUser(UpcomingTrips),
    linkTo: () => '/upcomingtrips'
  },
  TRIPDETAIL: {
    path: '/trip/:id',
    Component: WithUser(TripDetail),
    linkTo: id => `/trip/${id}`
  },
  ADDCAR: {
    path: '/addcar',
    Component: WithUser(AddCar),
    linkTo: () => '/addcar'
  },
  CREATETRIP: {
    path: '/createtrip',
    Component: WithUser(CreateTrip),
    linkTo: () => '/createtrip'
  },
  TEST: {
    path: '/test',
    Component: Test,
    linkTo: () => '/test'
  },
  MARKER_MAP: {
    path: '/map',
    Component: MarkerMap,
    linkTo: () => '/map'
  },
  SEARCH_MAP: {
    path: '/mapsearch',
    Component: SearchMap,
    linkTo: () => '/mapsearch'
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
