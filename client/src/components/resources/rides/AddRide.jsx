import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

import Nav from '../Nav.jsx';
import NewRideMap from '../maps/NewRideMap.jsx';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

class AddRide extends Component {
  static propTypes = {
    uid: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    origin: '',
    destination: '',
    depart: null,
    arrive: null,
  };

  addRide = e => {
    e.preventDefault();
    const { uid } = this.props;
    const { driver, seats } = this.state;
    this.props.firestore.add(
      { collection: 'rides' },
      { uid, driver, seats }
    );
    this.setState({ driver: '' });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if(!this.props.uid) return null;

    const { depart, arrive } = this.state;

    return (
      <Fragment>
        <Nav pageTitle="Create A Trip" />

        <NewRideMap />

        <StyledForm>

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

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
});

const mapDispatchToProps = {};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddRide);
