import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
var background = require('../../assets/landingwallpaper.jpg');

const StyledForm = styled.form`
  overflow: hidden;
  width: 100vw;
  position: absolute;
  top: 100px;
  background: none;
  h1 {
    text-align: center;
    font-weight: bolder;
  }
`;

const LabelInputContainer = styled.div`

  input {
    background: none;
    color: inherit;
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
  }

  background: none;
  color: inherit;
  text-align: center;
  font: inherit;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  left: 20vw;
  position: relative;
  width: 100vw;
  height: 34px;
  margin: 20px;
`;
const ButtonWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  background: none;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 3px;
  font: inherit;
  cursor: pointer;
  width: 100px;
  height: 40px;
`;

const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -3;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;

export default class SignUp extends PureComponent {
  // static propTypes = {
  //   import from o-auth
  // }

  state = {
    name: '',
    address: '',
    phone: ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, address, phone } = this.state;

    // I added the below function so we can pass it to props
    // const { registerUser } = this.props;
    event.preventDefault();
    // registerUser(name, address, phone);
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <Fragment>
        <BackgroundWrapper />
        <StyledForm onSubmit={this.onSubmit}>
          <h1>Sign up</h1>
          <LabelInputContainer>
            <label>
              Full Name{' '}
              <input
                id="name"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              Address{' '}
              <input
                id="address"
                name="address"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              Phone Number
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <ButtonWrapper>
            <Button>Register</Button>
          </ButtonWrapper>
        </StyledForm>
      </Fragment>
    );
  }
}
