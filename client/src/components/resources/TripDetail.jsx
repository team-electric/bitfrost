import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Nav from './Nav.jsx';
import { getSelectedRide } from '../../store/resources/rides/selectors.js';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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
`;

const UserInfoContainer = styled.div`
  text-align: center;
`;

class TripDetail extends Component {
  static propTypes = {
    selectedRide: PropTypes.object
  };

  render() {

    const { street, city, state, zip } = this.props.selectedRide.address;

    return (
      <Fragment>
        <Nav pageTitle="Trip Details" />
        <MapWrapper>
          <img src="https://staticmapmaker.com/img/google.png"></img>
        </MapWrapper>
        <StyledDiv>
          <div>
            <h3>Address:</h3>
            <p>{street}</p>
            <p>{city}, {state} {zip}</p>
          </div>
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

const mapStateToProps = (state, props) => ({
  uid: state.firebase.auth.uid,
  rides: state.firestore.ordered.rides || [],
  selectedRide: getSelectedRide(state, props.match.params.id)
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    console.log(props);
    if(!props.uid) return [];
    return [{
      collection: 'rides',
      where: [['uid', '==', props.uid]]
    }];
  })
)(TripDetail);
