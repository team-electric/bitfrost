import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../nav/Nav.jsx';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

export default class AddCar extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    make: '',
    model: '',
    plate: '',
    seats: ''
  };
  render() {
    return (
      <Fragment>
        <Nav pageTitle="Add A Car" />
        <StyledForm>
          <h1>
            Form to add a car to a users database. button to submit that
            forwards to create a trip page.
          </h1>
        </StyledForm>
      </Fragment>
    );
  }
}
