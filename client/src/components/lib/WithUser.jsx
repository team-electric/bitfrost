import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { ROUTES } from '../../routes';
import { getUser, getAuth, getUserLoading, getUserError } from '../../store/resources/users/selectors';
import { fetchUser } from '../../store/resources/users/actions';

export const WithUser = Component => {
  class WithUserComponent extends PureComponent {
    state = {
      attempted: false
    };

    render() {
      if(!isLoaded(this.props.auth)) return null;
      if(isEmpty(this.props.auth)) return <Redirect to={ROUTES.HOME.linkTo()} />;
      if(!this.props.user && !this.props.loading && !this.state.attempted){
        this.setState({ attempted: true });
        this.props.fetchUser(this.props.auth.email);
        return null;
      }
      if(this.props.error) return <Redirect to={ROUTES.HOME.linkTo()} />;
      if(this.props.loading) return null;
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: getUser(state),
    auth: getAuth(state),
    loading: getUserLoading(state),
    error: getUserError(state)
  });

  const mapDispatchToProps = dispatch => ({
    fetchUser: (email) => dispatch(fetchUser(email)),
  });

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect()
  )(WithUserComponent);
};
