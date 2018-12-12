import React, { PureComponent, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default class Profile extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  state = {
    // maybe user rating
  };


  onSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, address, phone, pay, make, model, plate, seats } = this.state;

    // I added the below function so we can pass it to props
    // const { updateUser } = this.props;
    event.preventDefault();
    // updateUser(firstName, lastName, address, phone, pay, make, model, plate, seats);
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
            <p>Name</p>
            <p>email</p>
            <p>phone</p>
            <p>Pickup Address:</p>
          </UserDiv>
          <CarDiv>
            <h2>Cars:</h2>
            <p>Name</p>
            <p>Name</p>
            <p>Name</p>
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
