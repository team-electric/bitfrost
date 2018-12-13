import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAuth, getUserLoading } from '../../store/resources/users/selectors.js';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const MapWrapper = styled.div`
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  img {
    width: 100vw;
    height: auto;
  }
`;

const UserImgWrapper = styled.div`
  position: relative;
  margin: auto;
  top: -30px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
`;
const UserImg = styled.div`
  width: 80px;
  border: 2px solid ${({ theme }) => theme.accentcolor};
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 80px;
  }
`;

const ButtonBox = styled.div`
  position: fixed;
  bottom: 25px;
  width: 100vw;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 2;
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
  padding: 55px;
  font: inherit;
  cursor: pointer;
  width: 40vw;
  height: 20vh;
  margin-top: 15px;
`;
class Dashboard extends Component {
  render() {
    if(!this.props.loading && !this.props.auth.email) return <Redirect to={ROUTES.HOME.linkTo()} />;
    if(this.props.loading) return <h1> LOADING </h1>;
    const { photoURL } = this.props.auth;
    return (
      <Fragment>
        <Nav pageTitle="Your Dashboard" />
        <MapWrapper>
          <img src={'https://staticmapmaker.com/img/google.png'} />
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
          <Button onClick={() => this.props.firebase.logout()}>Log Out</Button>
        </ButtonBox>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = state => ({

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(Dashboard);
