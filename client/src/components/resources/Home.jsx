import React, { Fragment } from 'react';
import Nav from './Nav.jsx';
import styled from 'styled-components';
import AuthButton from '../lib/AuthButton.jsx';
import RideList from './rides/RideList.jsx';

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Home = () => {
  return (
    <Fragment>
      <Nav pageTitle="Landing Page" />
      <Section>
        <h2>Home Page</h2>
        <AuthButton />
        <RideList />
      </Section>
    </Fragment>
  );
};

export default Home;
