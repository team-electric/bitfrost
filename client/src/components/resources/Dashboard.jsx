import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav.jsx';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getAuth,
  getUserLoading
} from '../../store/resources/users/selectors.js';
// import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { logoutUser } from '../../store/resources/users/actions.js';
import AllRidesMap from '../resources/maps/AllRidesMap.jsx';

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
  static propTypes = {
    uid: PropTypes.string,
    rides: PropTypes.arrayOf(PropTypes.object),
    selectedRide: PropTypes.object,
    selectRide: PropTypes.func.isRequired
  };

  logout = () => {
    this.props.logout();
    this.props.firebase.logout();
  };

  componentDidMount() {
    console.log('RIDES!!!!', this.props.rides);
  }

  render() {
    if(!this.props.loading && !this.props.auth.email)
      return <Redirect to={ROUTES.HOME.linkTo()} />;
    if(this.props.loading) return <h1> LOADING </h1>;
    const { photoURL } = this.props.auth;
    return (
      <Fragment>
        <Nav pageTitle='Your Dashboard' />
        <MapWrapper>
          <AllRidesMap
            rides={this.props.rides}
            onRideSelect={this.props.selectRide}
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
  uid: state.firebase.auth.uid,
  rides: state.firestore.ordered.rides || [],
  selectedRide: state.rides.selectedRide,
  auth: getAuth(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  selectRide: ride => dispatch({ type: 'selectRide', ride })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    if(!props.uid) return [];
    return [
      {
        collection: 'rides',
        where: [['uid', '==', props.uid]]
      }
    ];
  })
)(Dashboard);
