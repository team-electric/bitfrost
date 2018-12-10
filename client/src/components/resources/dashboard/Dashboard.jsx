import React, { Component, Fragment } from 'react';
import Nav from '../nav/Nav.jsx';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
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
        <Nav pageTitle='Your Dashboard' />
        <StyledDiv>
          <h1>
            User Dashboard here, showing map of current ride markers, user icon,
            buttons for upcoming trips, past trips, create trip and favorites.
          </h1>
        </StyledDiv>
      </Fragment>
    );
  }
}
