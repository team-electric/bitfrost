import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const Fetch = (Component, options = {}) => {
  return class FetchComponent extends PureComponent {
    static propTypes = {
      fetch: PropTypes.func.isRequired,
      dispatchUser: PropTypes.func,
      authData: PropTypes.object,
      user: PropTypes.object,
    };

    state = {
      data: null
    };

    componentDidMount() {
      const promise = this.props.fetch();
      if(!promise || typeof promise.then !== 'function') return;

      promise
        .then(data => this.setState({ data }));
    }

    componentDidUpdate() {
      if(!this.props.user) {
        if(this.props.dispatchUser && this.props.authData) {
          this.props.dispatchUser(this.props.authData.email);
        }
      }
    }

    render() {
      const { dataKey = 'data', defaultValue = null } = options;
      // const data = this.state.data || defaultValue;
      const data = this.props.data || defaultValue;
      const props = { ...this.props, [dataKey]: data };
      return <Component {...props} />;
    }
  };
};
