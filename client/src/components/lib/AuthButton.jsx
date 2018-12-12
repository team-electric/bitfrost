import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes';


const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  width: 100vw;
  top: 40%;

`;
const Button = styled.button`
  color: ${({ theme }) => theme.secondary};
  background: none;
  text-align: center;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  cursor: pointer;
`;


class AuthButton extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  };

  render() {
    if(!isLoaded(this.props.auth)) {
      return null;
    }
    if(isEmpty(this.props.auth)) {
      return (
        <ButtonWrapper>
          <Button
            onClick={
              () => this.props.firebase.login({ provider: 'google', type: 'popup' })
            }
          >Log in with Google</Button>
        </ButtonWrapper>
      );
    }
    return <Redirect to={ROUTES.SIGNUP.linkTo()} />;

  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = {
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(AuthButton);
