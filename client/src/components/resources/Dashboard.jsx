import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getAuth,
  getUserLoading
} from '../../store/resources/users/selectors.js';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { logoutUser } from '../../store/resources/users/actions.js';

const MapWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  img {
    height: 100vh;
    width: auto;
  }
`;

const UserImgWrapper = styled.div`
  position: fixed;
  bottom: 10vh;
  margin: auto;
  align-self: center;
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: center;
  z-index: 3;
`;
const UserImg = styled.div`
  width: 80px;
  border: 2px solid ${({ theme }) => theme.accentcolor};
  border-radius: 50%;
  overflow: hidden;
  img {
    height: 100%;
    width: 80px;
  }
`;

const ButtonBox = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100vw;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentcolor};
  }
`;

const Button = styled.button`
  background: none;
  color: ${({ theme }) => theme.accentcolor};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  cursor: pointer;
  width: 20vw;
  height: 12.5vh;
`;
class Dashboard extends Component {
  logout = () => {
    this.props.logout();
    this.props.firebase.logout();
  };

  render() {
    if(!this.props.loading && !this.props.auth.email)
      return <Redirect to={ROUTES.HOME.linkTo()} />;
    if(this.props.loading) return <h1> LOADING </h1>;
    const { photoURL } = this.props.auth;
    return (
      <Fragment>
        <Nav pageTitle="Your Dashboard" />
        <MapWrapper>
          <img
            src={
              'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg'
            }
          />
        </MapWrapper>
        <UserImgWrapper>
          <UserImg>
            <img src={photoURL} />
          </UserImg>
        </UserImgWrapper>
        <ButtonBox>
          <Link to={ROUTES.UPCOMINGTRIPS.linkTo()}>
            <Button>Upcoming Trips</Button>
          </Link>
          <Link to={ROUTES.PASTTRIPS.linkTo()}>
            <Button>Past Trips</Button>
          </Link>
          <Link to={ROUTES.CREATETRIP.linkTo()}>
            <Button>Create Trip</Button>
          </Link>
          <Button onClick={this.logout}>Log Out</Button>
        </ButtonBox>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(Dashboard);
