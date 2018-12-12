import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav.jsx';

const StyledDiv = styled.div`
  h2 {
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

const CarInfoContainer = styled.div`
  text-align: center;
  margin: 30px;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 15px;
  font: inherit;
  cursor: pointer;
  /* width: 90%; */
  /* height: 40px;
  margin-top: 3px;
  padding: 10px; */
`;

const UserInfoContainer = styled.div`
  text-align: center;
`;

export default class TripDetail extends Component {
  // static propTypes = {
  //   trips: PropTypes.object.isRequired,
  //   totalTrips: PropTypes.number.isRequired
  // };

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
          <h2>
            Google map with selected trip path shown. Driver Icon and personal
            information, number, car. Available seats with button to reserve and
            button to link to paypal/venmo. Trip rating?
          </h2>

          <UserInfoContainer>
            <h3>User Info</h3>
            <div>Name: Thor Ragnarok</div>
            <div>Phone: 971-522-1890</div>
            <div>Email: Thor@Ragnarok.com</div>
          </UserInfoContainer>

          <CarInfoContainer>
            <h3>Car Details</h3>
            <div>Make: Lexus</div>
            <div>Model: IS-350</div>
            <div>Plate: 832-JXY</div>
            <div>Seats available: 2</div>
          </CarInfoContainer>

          <div>
            <a href="www.paypal.com"> Pay with Paypal</a>
            <a href="www.venmo.com"> Pay with Venmo</a>
          </div>

          <Button>Reserve</Button>

        </StyledDiv>
      </Fragment>
    );
  }
}
