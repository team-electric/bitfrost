import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Fetch } from '../../lib/Fetch.jsx';
import { getUsers, getUser, getAuth } from '../../../store/resources/users/selectors';
import { fetchUsers, fetchUser, postUser } from '../../../store/resources/users/actions';


class Test extends PureComponent {

  static propTypes = {
    users: PropTypes.array,
    authData: PropTypes.object,
    user: PropTypes.object
  };

  state = {
    name: '',
    phone: '911',
    address: {
      zip: '12345'
    }
  };

  createUser = e => {
    e.preventDefault();
    const { email } = this.props.authData;
    const { name, phone, address } = this.state;
    postUser({ name, phone, address, email });
    this.setState({ name: '' });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { users } = this.props;
    const userList = users.map(user => (
      <li key={user._id}>name: {user.name}</li>
    ));
    return (
      <Fragment>
        <div>
          <h2>stuff from OAUTH</h2>
          <p>current user's email: {this.props.authData.email}</p>
          <p>current user's OAuth display name: {this.props.authData.displayName}</p>
          <p>current user's photo: </p>
          <img src={this.props.authData.photoURL} />
        </div>

        { this.props.user &&
          <div>
            <h2>user data from Mongo</h2>
            <p>current user's email: {this.props.user.email}</p>
            <p>current user's name: {this.props.user.name}</p>
            <p>current user's phone: {this.props.user.phone} </p>
            <p>current user's zip: {this.props.user.address.zip} </p>
          </div>
        }
        <form onSubmit={this.createUser}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          >
          </input>
          <button type="submit">create user</button>
        </form>
        <ul>{userList}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: getUsers(state),
  authData: getAuth(state),
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchUsers()),
  dispatchUser: email => dispatch(fetchUser(email))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Fetch(
  Test,
  { dataKey: 'users', defaultValue: [] }
));
