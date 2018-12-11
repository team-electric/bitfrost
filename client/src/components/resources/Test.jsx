import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Fetch } from '../lib/Fetch.jsx';
import { getUsers } from '../../store/resources/users/selectors';
import { fetchUsers } from '../../store/resources/users/actions';


class Test extends PureComponent {

  static propTypes = {
    users: PropTypes.array
  };

  render() {
    const { users } = this.props;
    const userList = users.map(user => (
      <li key={user._id}>name: {user.name}</li>
    ));
    return <ul>{userList}</ul>;
  }
}

const mapStateToProps = state => ({
  data: getUsers(state)
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
