import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import AddEvent from './AddEvent.jsx';

class EventList extends Component {
  static propTypes = {
    uid: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    selectedEvent: PropTypes.object,
    selectEvent: PropTypes.func.isRequired,
  };

  render() {
    const { events } = this.props;
    console.log(events);
    const eventItems = events.map(event => {
      return (
        <li
          key={event.driver}
          onClick={() => this.props.selectEvent(event)}

        >{event.driver}
        </li>
      );
    });
    return (
      <div>
        <AddEvent />
        <div>
          {eventItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  events: state.firestore.ordered.events || [],
  selectedEvent: state.events.selectedEvent
});

const mapDispatchToProps = dispatch => ({
  selectEvent: event => dispatch({ type: 'selectEvent', event })
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if(!props.uid) return [];
    return [
      {
        collection: 'events',
        where: [
          ['uid', '==', props.uid]
        ]
      }
    ];
  })
)(EventList);
