import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-weight: Extra-Light;
  font-size: 2em;
`;
const ButtonBox = styled.div`
  width: 100vw;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 2;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;

const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 55px;
  font: inherit;
  cursor: pointer;
  width: 40vw;
  height: 20vh;
  margin-top: 15px;
`;
export default class Dashboard extends Component {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    // maybe something for google api? search field?
  };

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Your Dashboard" />
        <ButtonBox>
          <Link to={ROUTES.UPCOMINGTRIPS.linkTo()}>
            <Button>Upcoming Trips</Button>
          </Link>
          <Link to={ROUTES.PASTTRIPS.linkTo()}>
            <Button>Past Trips</Button>
          </Link>
          <Link to={ROUTES.CREATETRIP.linkTo()}>
            <Button>Create Trip</Button>
          </Link>
          <Link to={ROUTES.PROFILE.linkTo()}>
            <Button>Favorites</Button>
          </Link>
        </ButtonBox>
        <StyledDiv>
          User Dashboard here, showing map of current ride markers, user icon,
          buttons for upcoming trips, past trips, create trip and favorites.
        </StyledDiv>
      </Fragment>
    );
  }
}
