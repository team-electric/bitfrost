import React, { PureComponent, Fragment } from 'react';
import Nav from '../nav/Nav.jsx';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

export default class CreateTrip extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    origin: '',
    destination: '',
    departTime: '',
    departDate: '',
    seats: ''
  };

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />

        <StyledForm>
          <h1>
            Form to create a trip, importing users database address as default
            origin or update depart location, and fields for destination
            address, depart time, comment from driver, import default available
            seats or update available seats.
          </h1>
        </StyledForm>
      </Fragment>
    );
  }
}
