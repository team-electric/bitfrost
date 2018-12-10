import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import AddRide from './AddRide.jsx';

class RideList extends Component {
  static propTypes = {
    uid: PropTypes.string,
    rides: PropTypes.arrayOf(PropTypes.object),
    selectedRide: PropTypes.object,
    selectRide: PropTypes.func.isRequired,
  };

  render() {
    const { rides } = this.props;
    const rideItems = rides.map(ride => {
      return (
        <li
          key={ride.driver}
          onClick={() => this.props.selectRide(ride)}
        >driver: {ride.driver} | seats: {ride.seats}
        </li>
      );
    });
    return (
      <div>
        <AddRide />
        <div>
          {rideItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  rides: state.firestore.ordered.rides || [],
  selectedRide: state.rides.selectedRide
});

const mapDispatchToProps = dispatch => ({
  selectRide: ride => dispatch({ type: 'selectRide', ride })
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if(!props.uid) return [];
    return [
      {
        collection: 'rides',
        where: [
          ['uid', '==', props.uid]
        ]
      }
    ];
  })
)(RideList);
