import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


class AddRider extends Component {
  static propTypes = {
    uid: PropTypes.string,
    selectedEvent: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  }
  state = { description: '', cost: 0 }

  addRider() {
    this.props.firestore.add(
      { collection: 'expenses' },
      {
        uid: this.props.uid,
        description: this.state.description,
        cost: this.state.cost,
        event: this.props.selectedEvent
      }
    )
    this.setState({ cost: 0, description: '' })
  }

  render() {
    if(!this.props.uid) return null;
    if(!this.props.selectedEvent) return null;

    return (
      <div>
        <input
          type="text"
          value={this.state.description}
          onChange={(evt) => this.setState({ description: evt.target.value })}
        />
        <input
          type="number"
          value={this.state.cost}
          step="0.01"
          onChange={e => this.setState({ driver: e.target.value })}
        />
        <button onClick={() => this.addRider()}>Add Rider</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  selectedEvent: state.events.selectedEvent
});

const mapDispatchToProps = {};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddRider);
