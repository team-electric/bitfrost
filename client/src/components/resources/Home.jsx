import React, { Fragment } from 'react';
import styled from 'styled-components';
import AuthButton from '../lib/AuthButton.jsx';
var background = require('../../assets/landingwallpaper.jpg');

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  z-index: -1;
`;
const Title = styled.div`
  position: relative;
  top: 100px;
  width: 100vw;
  font-size: 4em;
  font-family: "Poiret One", cursive;
`;
const SubTitle = styled.div`
  position: relative;
  top: 80px;
`;

const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -3;
  position: absolute;
  background: url(${background}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const Home = () => {
  return (
    <Fragment>
      <BackgroundWrapper />
      <AuthButton />
      <Section>
        <Title>Bitfrost</Title>
        <SubTitle>A RideSharing App</SubTitle>
      </Section>
    </Fragment>
  );
};

export default Home;
