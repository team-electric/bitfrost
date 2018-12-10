import React from 'react';

import AuthButton from '../../lib/AuthButton.jsx';
import EventList from '../events/EventList.jsx';

const Home = () => {

  return (
    <section>
      <h2>Home Page</h2>
      <AuthButton/>
      <EventList/>
    </section>
  );
};

export default Home;
