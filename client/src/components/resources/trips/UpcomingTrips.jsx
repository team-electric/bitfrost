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
  overflow: hidden;
`;

const UserImgWrapper = styled.div`
  position: relative;
  top: 10px;
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

background-image: linear-gradient(to bottom right, rgb(50, 55, 68), rgb(18, 25, 30));
  position: relative;
  width: 100vw;
  height: 100%;
  text-align: center;
  li {
    width: 80vw;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
  h2 {
    width: 100vw;
    text-align: center;
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 15px;
  font: inherit;
  cursor: pointer;
  width: 100%;
  height: 10vh;
  margin: 10px;
  div {
    display: flex;
    align-content: center;
    align-items: center;
  }
  span {
    color: ${({ theme }) => theme.accentcolor};
  }
`;

class UpcomingTrips extends PureComponent {
  render() {
    const { photoURL } = this.props.auth;

    const rides = this.props.rides.map(ride => {
      const { street, city, state } = ride.address;
      const time = new Date(ride.depart).toTimeString().split(' ')[0];
      const date = new Date(ride.depart).toDateString();
      return (
        <li key={ride.id}>
          <Link to={ROUTES.TRIPDETAIL.linkTo(ride.id)}>
            <Button>
              <div>
                <span>

                  {street}, {city}, {state}
                </span>
              </div>
              <div>
                <span>Departing at:&nbsp;</span> {time} on {date}
              </div>
            </Button>
          </Link>
        </li>
      );
    });
    return (
      <Fragment>
        <Nav pageTitle="Upcoming Trips" />

        <StyledDiv>
          <UserImgWrapper>
            <UserImg>
              <Link to={ROUTES.PROFILE.linkTo()}>
                <img src={photoURL} />
              </Link>
            </UserImg>
          </UserImgWrapper>

          <TripsContainer>
            <h2>UPCOMING TRIPS</h2>
            <ul>{rides}</ul>
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
