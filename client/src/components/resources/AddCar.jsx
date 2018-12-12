import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './Nav.jsx';
import { getUser, getUserNewCar, getUserLoading } from '../../store/resources/cars/selectors';
import { fetchCar, postCar } from '../../store/resources/cars/actions';
import { ROUTES } from '../../routes';
import { Redirect } from 'react-router-dom';

const StyledForm = styled.form`
  input {
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
    background: none;
    font: inherit;
    outline: none;
    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    form > div {
    clear: both;
    overflow: hidden;
    padding: 1px;
    margin: 0 0 10px 0;
  }
   /* label {
    display: inline-block;
    margin-bottom: 10px;
  }, */
  /* legend {
    margin-bottom: 10px;
    padding-right: 10px;
  } */

  /* input[type="text"],
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
  } */
  }`;


class AddCar extends Component {
  static propTypes = {
    // car: PropTypes.object.isRequired,
    // handleSubmit: PropTypes.func.isRequired
  };

  state = {
    plate: '',
    make: '',
    model: '',
    seats: ''
  };

  saveCar = (event) => {
    event.preventDefault();
    const { plate, make, model, seats } = this.state;
    this.props.postCar({ userId: this.props.user._id, plate, make, model, seats });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {

    if(!this.props.loading && this.props.newCar)
      return <Redirect to={ROUTES.PROFILE.linkTo()} />;
    if(this.props.loading) return <h1> PLEASE BE PATIENT, THE INTERNET IS SLOW, NOT THE APP!! </h1>;

    return (
      <>
        <Nav pageTitle="Add A Car"></Nav>
          <StyledForm onSubmit={this.saveCar}>
            <legend>Register Car</legend>

            <label htmlFor="make">Make:</label>
            <input name="make"
              type="text"
              value={this.state.make}
              onChange={this.handleChange}>
            </input>

            <label htmlFor="model">Model:</label>
            <input name="model"
              type="text"
              value={this.state.model}
              onChange={this.handleChange}>
            </input>

            <label htmlFor="plate">Plate:</label>
            <input
              name="plate"
              type="text"
              value={this.state.plate}
              onChange={this.handleChange}>
            </input>

            <label htmlFor="seats">Seats:</label>
            <input name="seats"
              type="number"
              value={this.state.seats}
              onChange={this.handleChange}>
            </input>

            <button type="submit">Register Car</button>
          </StyledForm>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  // newCar: getUserNewCar(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCar: email => dispatch(fetchCar(email)),
  postCar: car => dispatch(postCar(car))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCar);
