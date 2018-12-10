import React from 'react';

import AuthButton from '../../lib/AuthButton.jsx';
import RideList from '../rides/RideList.jsx';

const Home = () => {

  return (
    <section>
      <h2>Home Page</h2>
      <AuthButton/>
      <RideList/>
    </section>
  );
};

export default Home;
