import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddRide extends Component {
  static propTypes = {
    uid: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    driver: '',
    seats: '',
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

    return (
      <form onSubmit={this.addRide}>
        <input
          type="text"
          name="driver"
          value={this.state.driver}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="seats"
          value={this.state.seats}
          onChange={this.onChange}
        />
        <button type="submit">Add Ride</button>
      </form>
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
