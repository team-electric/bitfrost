import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { fetchCar } from '../../store/resources/cars/actions';
import { getUserCar } from '../../store/resources/cars/selectors';
import Nav from './Nav.jsx';
import { getUser, getAuth } from '../../store/resources/users/selectors';
import NewRideMap from './maps/NewRideMap.jsx';
import { v4 as uuid } from 'uuid';
import { ROUTES } from '../../routes/index.js';

import styled from 'styled-components';

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
  state = {
    origin: [],
    destination: [],
    departDTL: '',
    arriveDTL: '',
    address: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createRide = e => {
    e.preventDefault();
    const { uid } = this.props;
    const { departDTL, arriveDTL, origin, destination, address } = this.state;
    const convertDate = date => new Date(date).valueOf();
    const depart = convertDate(departDTL);
    const arrive = convertDate(arriveDTL);
    const seats = this.props.car.seats;
    const driver = this.props.user._id;

    this.props.firestore.add(
      { collection: 'rides' },
      {
        id: uuid(),
        uid,
        driver,
        seats,
        riders: [],
        depart,
        arrive,
        departed: false,
        origin,
        destination,
        currentLocation: origin,
        address
      }
    );
    this.setState({
      origin: '',
      destination: '',
      departDTL: '',
      arriveDTL: ''
    });
  };

  handlePositions = positions => {
    const { origin, destination, address } = positions;
    this.setState({ origin });
    this.setState({ destination });
    this.setState({ address });
  };

  componentDidMount() {
    this.props.fetchCar(this.props.user._id);
  }

  render() {
    const { departDTL, arriveDTL } = this.state;
    if(!this.props.loading && !this.props.car)
      return <Redirect to={ROUTES.ADDCAR.linkTo()} />;
    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />
        <MapWrapper>
          <NewRideMap handlePositions={this.handlePositions} />
        </MapWrapper>

        <StyledForm onSubmit={this.createRide}>
          <label htmlFor="departDTL">Estimated Depart Time</label>
          <input
            type="datetime-local"
            name="departDTL"
            value={departDTL}
            onChange={this.onChange}
          />
          <label htmlFor="arriveDTL">Estimated Arrival Time</label>
          <input
            type="datetime-local"
            name="arriveDTL"
            value={arriveDTL}
            onChange={this.onChange}
          />

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
  car: getUserCar(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCar: userId => dispatch(fetchCar(userId))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(CreateTrip);
