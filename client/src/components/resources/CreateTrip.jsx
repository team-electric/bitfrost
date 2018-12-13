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
    console.log(this.state);
    console.log(e.target.value);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  };

  createRide = e => {
    e.preventDefault();
    const { uid } = this.props;
    const {
      departDTL, arriveDTL, origin, destination
    } = this.state;

    console.log(origin, destination);

    const convertDate = date => new Date(date).valueOf();
    const depart = convertDate(departDTL);
    const arrive = convertDate(arriveDTL);

    const seats = this.props.car.seats;
    const driver = this.props.user._id;

    // const origin =
    // const destination =
    // const currentLocation =

    // save current location as lat,long and send destination as lat,long too
    // currentlocation is currentlocation
    // destination from chosen spot

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
    console.log('loaded', this.state);
    this.props.fetchCar(this.props.user._id);
  }

  render() {
    const { departDTL, arriveDTL } = this.state;

    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />

        <NewRideMap
          handlePositions={this.handlePositions}
        />

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
