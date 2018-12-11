import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav.jsx';

const StyledForm = styled.form`
  border: 1px solid ${({ theme }) => theme.accentcolor};
  background: none;
  color: inherit;
  font: inherit;
  outline: inherit;
  input {
    border: 1px solid black;
  },
  label {
    display: inline-block;
    margin-bottom: 10px;
  },
  legend {
    margin-bottom: 10px;
    padding-right: 10px;
  }

  input[type="text"],
  @media (max-width: 840px) {
    form {
      width: 70%;
    }
  }

  @media (max-width: 490px) {
    form {
      width: 100%;
    }
    button {
      width: 50%;
    }
  }

`;

class AddCar extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  state = {
    plate: '',
    make: '',
    model: '',
    seats: '',
  };

  saveCar = (event) => {
    event.preventDefault();
    const { plate, make, model, seats } = this.state;
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { plate, make, model, seats } = this.props;

    return (
      <div>
        <Nav pageTitle="Add A Car" />

        <StyledForm>
          <form onSubmit={this.saveCar}>
            <fieldset>
              <legend>Register Car</legend>
              <label htmlFor="plate">Plate:</label>
              <input name="plate" type="text" value={this.state.plate} onChange={this.onChange}></input>

              <label htmlFor="make">Make:</label>
              <input name="make" type="text" value={this.state.make} onChange={this.onChange}></input>

              <label htmlFor="model">Model:</label>
              <input name="model" type="text" value={this.state.model} onChange={this.onChange}></input>

              <label htmlFor="seats">Seats:</label>
              <input name="seats" type="number" value={this.state.seats} onChange={this.onChange}></input>

              <button type="submit">Register Car</button>
            </fieldset>
          </form>
        </StyledForm>
      </div>

    );
  }
}

export default AddCar;
