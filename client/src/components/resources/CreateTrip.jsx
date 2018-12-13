import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from './Nav.jsx';
import NewRideMap from './maps/NewRideMap.jsx';


const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

export default class CreateTrip extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    origin: '',
    destination: '',
    depart: null,
    arrive: null,
  };

  onChange = e => {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  };

  createRide = e => {
    e.preventDefault();
    const { uid } = this.props;

    const {
      origin, destination, depart, arrive
    } = this.state;

    this.props.firestore.add(
      { collection: 'rides' },
      { uid, driver, seats }
    );
    this.setState({
      origin: '', destination: '', depart: '', arrive: '',
    });
  };


  render() {

    // save current location as lat,long and send destination as lat,long too
    // get driver from current user
    // departed is false
    // currentlocation is currentlocation
    // seats from current car
    // destination from chosen spot
    const { depart, arrive } = this.state;

    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />

        <NewRideMap/>

        <StyledForm onSubmit={this.createRide}>

          <label htmlFor="depart">Estimated Depart Time</label>
          <input
            type="datetime-local"
            name="depart" value={depart}
            onChange={this.onChange}
          ></input>
          <label htmlFor="arrive">Estimated Arrival Time</label>
          <input
            type="datetime-local"
            name="arrive" value={arrive}
            onChange={this.onChange}
          ></input>

          <button type="submit">Create new trip</button>
        </StyledForm>
      </Fragment>
    );
  }
}
