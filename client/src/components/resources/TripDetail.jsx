import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Nav from './Nav.jsx';
import { firestoreConnect } from 'react-redux-firebase';
import {
  getUser,
  getAuth,
  updateUser
} from '../../store/resources/users/selectors';
import { fetchCar } from '../../store/resources/cars/actions';
import { fetchUser } from '../../store/resources/users/actions';
import { getUserCar } from '../../store/resources/cars/selectors';
import { getSelectedRide } from '../../store/resources/rides/selectors.js';

import { compose } from 'redux';

const StyledDiv = styled.div`
  h2 {
    font-weight: bolder;
  }
`;

const UserImgWrapper = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 10px;
  top: 10px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
`;
const UserImg = styled.div`
  width: 80px;
  border: 2px solid ${({ theme }) => theme.accentcolor};
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 80px;
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

  state = {
    name: '',
    email: '',
    phone: ''
  };

  componentDidMount() {
    const { name, email, phone } = this.props.user;
    this.props.fetchCar(this.props.user._id);
    if(this.props.user) {
      this.setState({
        ...this.state,
        email,
        name,
        phone
      });
    }
  }

  render() {

    if(!this.props.selectedRide) return null;

    const { photoURL } = this.props.auth;
    const { street, city, state, zip } = this.props.selectedRide.address;

    return (
      <Fragment>
        <Nav pageTitle='Trip Details' />
        <MapWrapper>
          <img src='https://staticmapmaker.com/img/google.png' />
        </MapWrapper>
        <UserImgWrapper>
          <UserImg>
            <img src={photoURL} />
          </UserImg>
        </UserImgWrapper>

        <StyledDiv>
          <div>
            <h3>Address:</h3>
            <p>{street}</p>
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <UserInfoContainer>
            <h3>User Info</h3>
            <div>Name: {this.state.name}</div>
            <div>Phone: {this.state.phone}</div>
            <div>Email: {this.state.email}</div>
          </UserInfoContainer>
          <CarInfoContainer>
            <h3>Car Details</h3>
            <div>Make: Lexus</div>
            <div>Model: IS-350</div>
            <div>Plate: 832-JXY</div>
            <div>Seats available: 2</div>
          </CarInfoContainer>
          <div>
            <a href='www.paypal.com'> Pay with Paypal</a>
            <a href='www.venmo.com'> Pay with Venmo</a>
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
  selectedRide: getSelectedRide(state, props.match.params.id),
  user: getUser(state),
  auth: getAuth(state),
  car: getUserCar(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  fetchCar: userId => dispatch(fetchCar(userId)),
  selectRide: ({ target }) => {
    dispatch({ type: 'selectRide', ride: target.value });
  }
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

// props.match.id
