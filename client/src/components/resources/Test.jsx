import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Fetch } from '../lib/Fetch.jsx';
import { getUsers, getCurrentUser } from '../../store/resources/users/selectors';
import { fetchUsers, postUser } from '../../store/resources/users/actions';


class Test extends PureComponent {

  static propTypes = {
    users: PropTypes.array,
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
    const { email } = this.props.user;
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
  user: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchUsers())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Fetch(
  Test,
  { dataKey: 'users', defaultValue: [] }
));
