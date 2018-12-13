import React, { PureComponent, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
import styled from 'styled-components';
import {
  getUser,
  getAuth,
  getUserLoading
} from '../../store/resources/users/selectors';
import { fetchUser } from '../../store/resources/users/actions';
import { getUserCar } from '../../store/resources/cars/selectors';
import { fetchCar } from '../../store/resources/cars/actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserImgWrapper = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 10px;
  top: 10px;
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

const StyledForm = styled.form`
  overflow: hidden;
  background: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font: inherit;
  outline: none;
  cursor: pointer;
  h2 {
      font-weight: bolder;
      text-align: center;
  }
  div {
    left: 25vw;
    position: relative;
  }
  input {
    left: 2vw;
    position: relative;
  }
  input {
    background: none;
    color: inherit;
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
  }
`;

const ButtonBox = styled.section`
  margin: auto;
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
  font: inherit;
  cursor: pointer;
  width: 40vw;
  height: 10vh;
  margin-bottom: 15px;
`;

class Profile extends PureComponent {

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
    // call action that updates user, pass in data from form state to the action
    // putUser( name, ) = this.state
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  componentDidMount() {
    this.props.fetchCar(this.props.user._id);
  }

  render() {
    const { photoURL } = this.props.auth;

    return (
      <Fragment>
        <Nav pageTitle="Your Profile" />
        <UserImgWrapper>
          <UserImg>
            <img src={photoURL} />
          </UserImg>
        </UserImgWrapper>

        {/* BELOW IS SHOWN WHEN AT NORMAL PROFILE PAGE */}

        {/* <StyledForm onSubmit={this.onSubmit}>
          <h2>Your Info</h2>
          <div>
            <label>Name: {this.props.user.name}</label>
          </div>
          <div>
            <label>Email: {this.props.user.email}</label>
          </div>
          <div>
            <label>Phone Number: {this.props.user.phone}</label>
          </div>
          <div>
            <label>Street: {this.props.user.address.street}</label>
          </div>
          <div>
            <label>City: {this.props.user.address.city}</label>
          </div>
          <div>
            <label>State: {this.props.user.address.state}</label>
          </div>
          <div>
            <label>Zip: {this.props.user.address.zip}</label>
          </div>
          <div>
            <label>Venmo/Paypal</label>
          </div>

          <h2>Update Car</h2>
          <div>
            {this.props.car && <label>Make: {this.props.car.make} </label>}
          </div>
          <div>
            {this.props.car && <label>Model: {this.props.car.model} </label>}
          </div>
          <div>
            {this.props.car && <label>Plate: {this.props.car.plate} </label>}
          </div>
          <div>
            {this.props.car && <label>Seats: {this.props.car.seats}</label>}
          </div>
          <ButtonBox>
            <Link to={ROUTES.PROFILE.linkTo()}>
              <Button>Edit</Button>
            </Link>
            <Link to={ROUTES.ADDCAR.linkTo()}>
              <Button>Add Car</Button>
            </Link>
          </ButtonBox>
        </StyledForm> */}

        {/* BELOW IS SHOWN WHEN EDITING */}

        <StyledForm onSubmit={this.onSubmit}>
          <h2>Update</h2>

          <div>
            <label>Name:</label><input id="name" name="name" type="text" onChange={this.handleChange} placeholder={this.props.user.name}/>
          </div>
          <div>
            <label>Email:</label><input id="email" name="email" type="text" onChange={this.handleChange} placeholder={this.props.user.email}/>
          </div>
          <div>
            <label>Phone Number:<input id="phone" name="phone" type="tel" onChange={this.handleChange} placeholder={this.props.user.phone}/></label>
          </div>
          <div>
            <label>Street:<input id="street" name="street" type="text" onChange={this.handleChange} placeholder={this.props.user.address.street}/></label>
          </div>
          <div>
            <label>City:<input id="city" name="city" type="text" onChange={this.handleChange} placeholder={this.props.user.address.city}/></label>
          </div>
          <div>
            <label>State:<input id="state" name="state" type="text" onChange={this.handleChange} placeholder={this.props.user.address.state}/></label>
          </div>
          <div>
            <label>Zip:<input id="zip" name="zip" type="text" onChange={this.handleChange} placeholder={this.props.user.address.zip}/></label>
          </div>
          <div>
            <label>Venmo/Paypal<input id="pay" name="pay" type="text" onChange={this.handleChange}/></label>
          </div>

          <h2>Current Car</h2>
          <div>
            {this.props.car && <label>Make <input id="make" name="make" type="text" onChange={this.handleChange} placeholder={this.props.car.make}/></label>}
          </div>
          <div>
            {this.props.car && <label>model <input id="model" name="model" type="text" onChange={this.handleChange} placeholder={this.props.car.model}/></label>}
          </div>
          <div>
            {this.props.car && <label>plate <input id="plate" name="plate" type="text" onChange={this.handleChange} placeholder={this.props.car.plate}/></label>}
          </div>
          <div>
            {this.props.car && <label>Seats<input id="seats" name="seats" type="number" onChange={this.handleChange} placeholder={this.props.car.seats}/></label>}
          </div>

          <ButtonBox>
            <Link to={ROUTES.PROFILE.linkTo()}>
              <Button>Update</Button>
            </Link>
            <Link to={ROUTES.ADDCAR.linkTo()}>
              <Button>Add Car</Button>
            </Link>
          </ButtonBox>
        </StyledForm>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
  car: getUserCar(state)
  // loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  fetchCar: userId => dispatch(fetchCar(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
