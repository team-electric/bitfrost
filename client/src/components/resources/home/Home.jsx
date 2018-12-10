import React from 'react';
import Nav from '../nav/Nav.jsx';

import AuthButton from '../../lib/AuthButton.jsx';
import RideList from '../rides/RideList.jsx';

const Home = () => {
  return (
    <section>
      <Nav pageTitle="Landing Page" />

      <h2>Home Page</h2>
      <AuthButton />
      <RideList />
    </section>
  );
};

export default Home;
