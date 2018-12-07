import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import PropTypes from 'prop-types';

export default class AuthForm extends PureComponent {
  static propTypes = {
    typeText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    sessions: PropTypes.object
  };

  state = {
    email: '',
    password: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  };

  render() {
    if(this.props.session) return <Redirect to={ROUTES.HOME.linkTo()} />;

    const { typeText } = this.props;
    const { email, password } = this.state;
    return (
      <>
        <h3>{typeText}</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <button>{typeText}</button>
        </form>
      </>
    );
  }
}
