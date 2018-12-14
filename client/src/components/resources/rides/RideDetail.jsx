import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Nav from '../../lib/Nav.jsx';
import { firestoreConnect } from 'react-redux-firebase';
import {
  getUser,
  getAuth,
  updateUser
} from '../../../store/resources/users/selectors';
import { ROUTES } from '../../../routes/index.js';
import { Link, Redirect } from 'react-router-dom';
import { fetchCar } from '../../../store/resources/cars/actions';
import { fetchUser } from '../../../store/resources/users/actions';
import { getUserCar } from '../../../store/resources/cars/selectors';
import { getSelectedRide } from '../../../store/resources/rides/selectors.js';
import { compose } from 'redux';

import TripMap from '../maps/TripMap.jsx';

const StyledDiv = styled.div`
  position: relative;
  top: -80px;
  border-top: 2px solid ${({ theme }) => theme.accentcolor};
`;

const UserImgWrapper = styled.div`
  position: relative;
  margin: auto;
  top: -30px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  z-index: 4;
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
const BoxContainer = styled.div`
  position: relative;
  top: -15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const CarInfoContainer = styled.div`
  text-align: center;
  width: 40vw;
  div {
    position: relative;
    top: -15px;
  }
`;
const UserInfoContainer = styled.div`
  text-align: center;
  width: 40vw;
  div {
    position: relative;
    top: -15px;
  }
`;
const RideInfoContainer = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  span {
    position: relative;
    top: -15px;
  }
`;
const ButtonWrapper = styled.div`
  position: relative;
  top: -15px;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  height: 8vh;
  width: 30vw;
  font: inherit;
  cursor: pointer;
`;

class TripDetail extends Component {
  static propTypes = {
    selectedRide: PropTypes.object
  };

  state = {
    name: '',
    email: '',
    phone: '',
    reserved: false,
    redirect: false
  };

  redirect = () => {
    this.setState({ redirect: true });
  }
  switch = () => {
    this.setState({ reserved: true });
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
    if(this.state.redirect) return <Redirect to={ROUTES.RIDE_DISPLAY.linkTo()} />;
    const { photoURL } = this.props.auth;
    const { street, city, state, zip } = this.props.selectedRide.address;
    const { origin, destination } = this.props.selectedRide;
    return (
      <Fragment>
        <Nav pageTitle="Trip Details" />
        <MapWrapper>
          <TripMap rides={[origin, destination]} />
        </MapWrapper>
        <UserImgWrapper>
          <UserImg>
            <Link to={ROUTES.USER_EDIT.linkTo()}>
              <img src={photoURL} />
            </Link>
          </UserImg>
        </UserImgWrapper>
        <StyledDiv>
          <RideInfoContainer>
            <h3>Destination:</h3>
            <span>{street}</span>
            <span>
              {city}, {state} {zip}
            </span>
          </RideInfoContainer>
          <BoxContainer>
            <UserInfoContainer>
              <h3>Driver Info</h3>
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
          </BoxContainer>
          <ButtonWrapper>
            {!this.state.reserved && <Button onClick={this.switch}>Reserve</Button>}
            {this.state.reserved && <Button onClick={this.redirect}>Cancel</Button>}
          </ButtonWrapper>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    console.log(props);
    if(!props.uid) return [];
    return [
      {
        collection: 'rides',
        where: [['uid', '==', props.uid]]
      }
    ];
  })
)(TripDetail);
