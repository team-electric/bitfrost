import React, { PureComponent, Fragment } from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';
import styled from 'styled-components';
import {
  getUser,
  getAuth,
  updateUser
} from '../../store/resources/users/selectors';
import { fetchUser, putUser, logoutUser } from '../../store/resources/users/actions';
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
  width: 100vw;
  overflow: hidden;
  background: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font: inherit;
  outline: none;
  cursor: pointer;
  h3 {
    font-weight: bolder;
    text-align: center;
  }
  div {
    left: 25vw;
    position: relative;
  }
  input {
    font-size: 1em;
    width: 175px;
    background: none;
    color: inherit;
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
  }
  label {
    color: ${({ theme }) => theme.accentcolor};
    input {
      color: ${({ theme }) => theme.secondary}
    }
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
    street: '',
    zip: '',
    make: '',
    model: '',
    plate: '',
    seats: ''
  };

  logout = () => {
    this.props.firebase.logout().then(() => {
      this.props.logout();
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email } = this.props.auth;
    const { name, phone, city, state, zip, street } = this.state;

    this.props
      .putUser({
        _id: this.props.user._id,
        name,
        email,
        phone,
        city,
        state,
        zip,
        street,
        redirect: false
      })
      .then(() => {
        fetchUser(email);
      });
    this.setState({ redirect: true });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  componentDidMount() {
    const { name, email, phone, address } = this.props.user;
    this.props.fetchCar(this.props.user._id);
    if(this.props.user) {
      this.setState({
        ...this.state,
        email,
        name,
        phone,
        ...address
      });
    }
  }

  render() {
    if(this.state.redirect) return <Redirect to={ROUTES.DASHBOARD.linkTo()} />;
    const { photoURL } = this.props.auth;

    return (
      <Fragment>
        <Nav pageTitle='Your Profile' />
        <UserImgWrapper>
          <UserImg>
            <img src={photoURL} />
          </UserImg>
        </UserImgWrapper>

        <StyledForm onSubmit={this.onSubmit}>
          <h3>Your Profile</h3>

          <div>
            <label>Name:&nbsp;&nbsp;&nbsp;</label>
            <input
              id='name'
              name='name'
              type='text'
              onChange={this.handleChange}
              placeholder={this.props.user.name}
              value={this.state.name}
            />
          </div>
          <div>
            <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              id='email'
              name='email'
              type='text'
              onChange={this.handleChange}
              placeholder={this.props.user.email}
              value={this.state.email}
            />
          </div>
          <div>
            <label>
              Phone:&nbsp;&nbsp;&nbsp;
              <input
                id='phone'
                name='phone'
                type='tel'
                onChange={this.handleChange}
                placeholder={this.props.user.phone}
                value={this.state.phone}
              />
            </label>
          </div>
          <div>
            <label>
              Street:&nbsp;&nbsp;&nbsp;
              <input
                id='street'
                name='street'
                type='text'
                onChange={this.handleChange}
                placeholder={this.props.user.address.street}
                value={this.state.street}
              />
            </label>
          </div>
          <div>
            <label>
              City:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                id='city'
                name='city'
                type='text'
                onChange={this.handleChange}
                placeholder={this.props.user.address.city}
                value={this.state.city}
              />
            </label>
          </div>
          <div>
            <label>
              State:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                id='state'
                name='state'
                type='text'
                onChange={this.handleChange}
                placeholder={this.props.user.address.state}
                value={this.state.state}
              />
            </label>
          </div>
          <div>
            <label>
              Zip:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                id='zip'
                name='zip'
                type='text'
                onChange={this.handleChange}
                placeholder={this.props.user.address.zip}
                value={this.state.zip}
              />
            </label>
          </div>

          <h3>{this.props.car && <span>Current Car</span> }</h3>
          <div>
            {this.props.car && <label>Make: &nbsp;&nbsp;{this.props.car.make} </label>}
          </div>
          <div>
            {this.props.car && <label>Model: &nbsp;&nbsp;{this.props.car.model} </label>}
          </div>
          <div>
            {this.props.car && <label>Plate: &nbsp;&nbsp;{this.props.car.plate} </label>}
          </div>
          <div>
            {this.props.car && <label>Seats: &nbsp;&nbsp;{this.props.car.seats}</label>}
          </div>

          <ButtonBox>
            <Button type='submit'>Update</Button>
            <Link to={ROUTES.ADDCAR.linkTo()}>
              <Button>Edit Car</Button>
            </Link>
            <Button onClick={this.logout}>Log Out</Button>
          </ButtonBox>
        </StyledForm>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
  car: getUserCar(state),
  update: updateUser(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  fetchUser: email => dispatch(fetchUser(email)),
  fetchCar: userId => dispatch(fetchCar(userId)),
  putUser: user => dispatch(putUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
