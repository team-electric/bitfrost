import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

const LabelInputContainer = styled.div`
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
  width: 400px;
  height: 34px;
  margin: 20px;
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
      <StyledForm onSubmit={this.onSubmit}>
        <h1>
          Signup form here, add button to update user info from o-auth and
          redirect to dashboard
        </h1>
        <h1>Sign up</h1>
        <LabelInputContainer>
          <label>Full Name <input id="name" name="name" type="text" onChange={this.handleChange}/></label>
        </LabelInputContainer>
        <LabelInputContainer>
          <label>Address <input id="address" name="address" type="text" onChange={this.handleChange}/></label>
        </LabelInputContainer>
        <LabelInputContainer>
          <label>Phone Number<input id="phone" name="phone" type="tel" onChange={this.handleChange}/></label>
        </LabelInputContainer>
        <LabelInputContainer>
          <Button>Register</Button>
        </LabelInputContainer>
      </StyledForm>
    );
  }
}
