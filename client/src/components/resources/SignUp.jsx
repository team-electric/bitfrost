import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  h1 {
    font-weight: bolder;
  }
`;

export default class SignUp extends PureComponent {
  // static propTypes = {
  //   import from o-auth
  // }
  state = {
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  };

  render() {
    return (
      <StyledForm>
        <h1>
          Signup form here, add button to update user info from o-auth and
          redirect to dashboard
        </h1>
      </StyledForm>
    );
  }
}
