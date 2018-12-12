import React, { PureComponent, Fragment } from 'react';
import Nav from './Nav.jsx';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
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

const Button = styled.button`
  background: none;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 3px;
  font: inherit;
  cursor: pointer;
  width: 100px;
  height: 40px;
  left: 36vw;
  top: 2vh;
  position: relative;

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

        <StyledForm onSubmit={this.onSubmit}>
          <h2>Update Profile</h2>

          <div>
            <label>First Name</label><input id="firstName" name="firstName" type="text" onChange={this.handleChange}/>
          </div>
          <div>
            <label>Last Name <input id="lastName" name="lastName" type="text" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>Address <input id="address" name="address" type="text" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>Phone Number<input id="phone" name="phone" type="tel" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>Venmo/Paypal<input id="pay" name="pay" type="text" onChange={this.handleChange}/></label>
          </div>

          <h2>Update Car</h2>
          <div>
            <label>Make <input id="make" name="make" type="text" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>model <input id="model" name="model" type="text" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>plate <input id="plate" name="plate" type="text" onChange={this.handleChange}/></label>
          </div>
          <div>
            <label>Seats<input id="seats" name="seats" type="number" onChange={this.handleChange}/></label>
          </div>
          <Button> Save Settings</Button>
        </StyledForm>
      </Fragment>
    );
  }
}
