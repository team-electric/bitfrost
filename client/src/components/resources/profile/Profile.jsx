import React, { PureComponent, Fragment } from 'react';
import Nav from '../nav/Nav.jsx';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
`;

export default class Profile extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    // maybe user rating
  };

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Your Profile" />

        <StyledDiv>
          <h1>
            User Profile here, showing user icon, address, number, email,
            rating. Button links to Add Car and Edit Profile, button to favorite
            user.
          </h1>
        </StyledDiv>
      </Fragment>
    );
  }
}
