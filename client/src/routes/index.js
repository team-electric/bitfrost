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
  DASHBOARD: {
    path: '/dashboard',
    Component: Dashboard,
    linkTo: () => '/dashboard'
  },
  PROFILE: {
    path: '/profile',
    Component: Profile,
    linkTo: () => '/profile'
  },
  PASTTRIPS: {
    path: '/pasttrips',
    Component: PastTrips,
    linkTo: () => '/pasttrips'
  },
  UPCOMINGTRIPS: {
    path: '/upcomingtrips',
    Component: UpcomingTrips,
    linkTo: () => '/upcomingtrips'
  },
  TRIPDETAIL: {
    path: '/tripdetail',
    Component: TripDetail,
    linkTo: () => '/tripdetail'
  },
  ADDCAR: {
    path: '/addcar',
    Component: AddCar,
    linkTo: () => '/addcar'
  },
  CREATETRIP: {
    path: '/createtrip',
    Component: CreateTrip,
    linkTo: () => '/createtrip'
  }
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
