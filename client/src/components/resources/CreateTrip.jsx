import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Nav from './Nav.jsx';
import NewRideMap from './maps/NewRideMap.jsx';

import { fetchCar } from '../../store/resources/cars/actions';
import { getCar } from '../../store/resources/cars/selectors';
import { getUser, getAuth, getUserLoading } from '../../store/resources/users/selectors';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

const MapWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  img {
    height: 100vh;
    width: auto;
  }
`;

class CreateTrip extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    origin: [],
    destination: [],
    departDTL: '',
    arriveDTL: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createRide = e => {
    e.preventDefault();
    const { uid } = this.props;
    const {
      departDTL, arriveDTL, origin, destination
    } = this.state;

    const convertDate = date => new Date(date).valueOf();
    const depart = convertDate(departDTL);
    const arrive = convertDate(arriveDTL);

    const seats = this.props.car.seats;
    const driver = this.props.user._id;

    this.props.firestore.add(
      { collection: 'rides' },
      {
        uid, driver, seats, riders: [],
        depart, arrive, departed: false,
        origin, destination, currentLocation: origin
      }
    );
    this.setState({
      origin: '', destination: '', departDTL: '', arriveDTL: '',
    });
  };

  handlePositions = (positions) => {
    const { origin, destination } = positions;
    this.setState({ origin });
    this.setState({ destination });
  }

  componentDidMount() {
    this.props.fetchCar(this.props.user._id);
  }

  render() {
    const { departDTL, arriveDTL } = this.state;

    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />
        <MapWrapper>
          <NewRideMap
            handlePositions={this.handlePositions}
          />
        </MapWrapper>

        <StyledForm onSubmit={this.createRide}>

          <label htmlFor="departDTL">Estimated Depart Time</label>
          <input
            type="datetime-local"
            name="departDTL" value={departDTL}
            onChange={this.onChange}
          ></input>
          <label htmlFor="arriveDTL">Estimated Arrival Time</label>
          <input
            type="datetime-local"
            name="arriveDTL" value={arriveDTL}
            onChange={this.onChange}
          ></input>

          <button type="submit">Create new trip</button>
        </StyledForm>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  user: getUser(state),
  auth: getAuth(state),
  car: getCar(state)
});


const mapDispatchToProps = dispatch => ({
  // fetchUser: email => dispatch(fetchUser(email)),
  fetchCar: userId => dispatch(fetchCar(userId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(CreateTrip);
