import React, { PureComponent, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  getUser,
  getAuth,
  getUserLoading
} from '../../store/resources/users/selectors';
import { fetchUser } from '../../store/resources/users/actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserImgWrapper = styled.div`
position: relative;
top: 30px;
 width: 100vw;
 height: 30vw;
 display: flex;
 justify-content: center;
`;

const UserImg = styled.div`
  width: 30vw;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  border-radius: 50%;
`;

const InfoDiv = styled.div`
position: relative;
top: 15px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  flex-grow: 2;
`;

const UserDiv = styled.div`
  width: 40vw;
`;
const CarDiv = styled.div`
  width: 40vw;
`;

const ButtonBox = styled.div`
  position: fixed;
  bottom: 15px;
  width: 100vw;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  flex-grow: 2;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;

const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 55px;
  font: inherit;
  cursor: pointer;
  width: 40vw;
  height: 20vh;
  margin-bottom: 15px;
`;

class Profile extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    make: '',
    model: '',
    plate: '',
    seats: ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { email } = this.props.auth;
    const { name, phone, city, state, zip, make, model, plate, seats } = this.state;


  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Your Profile" />
        <UserImgWrapper>
          <UserImg>USER IMG</UserImg>
        </UserImgWrapper>
        <InfoDiv>
          <UserDiv>
            <h2>User Info:</h2>
            <p>Name: {this.props.user.name} </p>
            <p>Email: {this.props.user.email} </p>
            <p>Phone: {this.props.user.phone} </p>
            <p>Street: {this.props.user.address.street} </p>
            <p>City: {this.props.user.address.city} </p>
            <p>State: {this.props.user.address.state} </p>
            <p>Zip: {this.props.user.address.zip} </p>
          </UserDiv>
          <CarDiv>
            <h2>Cars:</h2>
            <p>Make: </p>
            <p>Model: </p>
            <p>Plate: </p>
            <p>Seats Available: </p>
          </CarDiv>
        </InfoDiv>
        <ButtonBox>
          <Link to={ROUTES.PROFILE.linkTo()}>
            <Button>Edit Profile</Button>
          </Link>
          <Link to={ROUTES.ADDCAR.linkTo()}>
            <Button>Add Car</Button>
          </Link>
        </ButtonBox>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
  // loading: getUserLoading(state)
});


const mapDispatchToProps = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
