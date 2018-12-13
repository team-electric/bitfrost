import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../Nav.jsx';
import { ROUTES } from '../../../routes/index.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
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

const TripsContainer = styled.div`
  text-align: center;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
  width: 90vw;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 15px;
  font: inherit;
  cursor: pointer;
  width: 100%;
  height: 75px;
  margin-top: 8px;
  padding: 15px;
`;

class UpcomingTrips extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }

  render() {
    const { photoURL } = this.props.auth;

    const rides = this.props.rides.map(ride => {
      return (
        <li key={ride.id}>
          <Link to={ROUTES.TRIPDETAIL.linkTo()}>
            <Button>{ride.currentLocation} </Button>
          </Link>
        </li>
      );
    });
    return (
      <Fragment>
        <Nav pageTitle='Upcoming Trips' />

        <StyledDiv>
          <UserImgWrapper>
            <UserImg>
              <img src={photoURL} />
            </UserImg>
          </UserImgWrapper>

          <TripsContainer>
            <h2>UPCOMING TRIPS</h2>
            <ol>
              {rides}
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Jackie Chan - Seattle - 1.1.19 </Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Ryan Luras - Washginton DC - 1.13.19</Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Kurt Russell - Beaverton - 1.15.19 </Button>
                </Link>
              </li>
            </ol>
          </TripsContainer>
        </StyledDiv>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  rides: state.firestore.ordered.rides || [],
  selectedRide: state.rides.selectedRide
});

const mapDispatchToProps = dispatch => ({
  selectRide: ({ target }) => {
    dispatch({ type: 'selectRide', ride: target.value });
  }
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
)(UpcomingTrips);
