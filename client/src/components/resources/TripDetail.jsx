import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav.jsx';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
`;

export default class TripDetail extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Trip Details" />

        <StyledDiv>
          <h1>
            Google map with selected trip path shown. Driver Icon and personal
            information, number, car. Available seats with button to reserve and
            button to link to paypal/venmo. Trip rating?
          </h1>
        </StyledDiv>
      </Fragment>
    );
  }
}
