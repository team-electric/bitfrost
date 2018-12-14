import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { fetchCar } from '../../../store/resources/cars/actions';
import {
  getUserCar,
  getCarLoading
} from '../../../store/resources/cars/selectors';
import Nav from '../../lib/Nav.jsx';
import { getUser, getAuth } from '../../../store/resources/users/selectors';
import NewRideMap from '../maps/NewRideMap.jsx';
import { ROUTES } from '../../../routes/index.js';

import styled from 'styled-components';

const PageDiv = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const StyledForm = styled.form`
  display: flex;

  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.accentcolor};
  height: 20vh;
`;
const InputDiv = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    color: ${({ theme }) => theme.accentcolor};
  }
  input {
    background-color: ${({ theme }) => theme.secondary};
    width: 45vw;
  }
`;
const ButtonDiv = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Button = styled.button`
  font-size: 1em;
  background: none;
  color: ${({ theme }) => theme.accentcolor};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  cursor: pointer;
  width: 40vw;
  height: 1.5em;
`;

const MapWrapper = styled.div`
  position: relative;
  top: -1px;
  width: 100vw;
  height: 75vh;
  overflow: hidden;
  img {
    height: 100vh;
    width: auto;
  }
`;

class CreateTrip extends PureComponent {
  state = {
    origin: [],
    destination: [],
    departDTL: '',
    arriveDTL: '',
    address: {},
    redirect: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createRide = e => {
    e.preventDefault();
    const { uid } = this.props;
    const { departDTL, arriveDTL, origin, destination, address } = this.state;
    const convertDate = date => new Date(date).valueOf();
    const depart = convertDate(departDTL);
    const arrive = convertDate(arriveDTL);
    const seats = this.props.car.seats;
    const driver = this.props.user._id;

    this.props.firestore.add(
      { collection: 'rides' },
      {
        uid,
        driver,
        seats,
        riders: [],
        depart,
        arrive,
        departed: false,
        origin,
        destination,
        currentLocation: origin,
        address
      }
    );
    this.setState({
      origin: '',
      destination: '',
      departDTL: '',
      arriveDTL: '',
      redirect: true
    });
  };

  handlePositions = positions => {
    const { origin, destination, address } = positions;
    this.setState({ origin });
    this.setState({ destination });
    this.setState({ address });
  };

  componentDidMount() {
    this.props.fetchCar(this.props.user._id);
  }

  render() {
    if(this.state.redirect)
      return <Redirect to={ROUTES.RIDE_DISPLAY.linkTo()} />;
    const { departDTL, arriveDTL } = this.state;
    // if(!this.props.loading && !this.props.car)
    //   return <Redirect to={ROUTES.CAR_ADD.linkTo()} />;
    return (
      <PageDiv>
        <Nav pageTitle="Create A Trip" />
        <MapWrapper>
          <NewRideMap handlePositions={this.handlePositions} />
        </MapWrapper>

        <StyledForm onSubmit={this.createRide}>
          <InputDiv>
            <label htmlFor="departDTL">Estimated Depart Time: </label>
            <input
              type="datetime-local"
              name="departDTL"
              value={departDTL}
              onChange={this.onChange}
            />
          </InputDiv>
          <InputDiv>
            <label htmlFor="arriveDTL">Estimated Arrival Time: </label>
            <input
              type="datetime-local"
              name="arriveDTL"
              value={arriveDTL}
              onChange={this.onChange}
            />
          </InputDiv>
          <ButtonDiv>
            <Button type="submit">Create new trip</Button>
          </ButtonDiv>
        </StyledForm>
      </PageDiv>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  user: getUser(state),
  auth: getAuth(state),
  car: getUserCar(state),
  loading: getCarLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCar: userId => dispatch(fetchCar(userId))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(CreateTrip);
