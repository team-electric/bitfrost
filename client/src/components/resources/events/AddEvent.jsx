import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddEvent extends Component {
  static propTypes = {
    uid: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };

  state = { driver: '' };

  addEvent() {
    const { uid } = this.props;
    const { driver } = this.state;
    this.props.firestore.add(
      { collection: 'events' },
      { uid, driver }
    );
    this.setState({ driver: '' });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if(!this.props.uid) return null;

    return (
      <div>
        <input
          type="text"
          name="driver"
          value={this.state.driver}
          onChange={this.onChange}
        />
        <button onClick={() => this.addEvent()}>Add Event</button>
      </div>
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
)(AddEvent);
