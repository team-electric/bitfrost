import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav.jsx';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
`;

const MapWrapper = styled.div`
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  img {
    width: 100vw;
    height: auto;
  }
`;

export default class TripDetail extends Component {
  static propTypes = {
    trips: PropTypes.object.isRequired,
    totalTrips: PropTypes.number.isRequired
  };

  // tripDetail = ({ PastTrips }) => {
  //   const { user, destination, date } = PastTrips;
  // };

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Trip Details" />
        <MapWrapper>
          <img src="https://staticmapmaker.com/img/google.png"></img>
        </MapWrapper>

        <StyledDiv>
          <h1>
            Google map with selected trip path shown. Driver Icon and personal
            information, number, car. Available seats with button to reserve and
            button to link to paypal/venmo. Trip rating?
          </h1>

          <h3>Driver info</h3>


          <h3>Car info</h3>
          <p>Make</p>
          <p>Model</p>
          <p>Plate</p>




          <a href="www.paypal.com"> Pay with Paypal</a>
          <a href="www.venmo.com"> Pay with Venmo</a>

        </StyledDiv>
      </Fragment>
    );
  }
}
