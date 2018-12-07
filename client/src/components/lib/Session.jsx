import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { getSession, getSessionLoading } from '../../store/resources/sessions/selectors';
import { refreshSession } from '../../store/resources/sessions/actions';

export const Session = Component => {

  class SessionComponent extends PureComponent {
    static propTypes = {
      loading: PropTypes.bool.isRequired,
      session: PropTypes.object
    };

    componentDidMount() {
      if(!this.props.session) this.props.refreshSession();
    }

    render() {
      if(this.props.loading) return <h1>LOADING SESSION</h1>;
      if(!this.props.session) return <Redirect to={ROUTES.LOGIN.linkTo()} />;

      return <Component {...this.props} />;
    }
  }

  return connect(
    state => ({
      session: getSession(state),
      loading: getSessionLoading(state)
    }),
    dispatch => ({ refreshSession: () => dispatch(refreshSession()) })
  )(SessionComponent);
};
