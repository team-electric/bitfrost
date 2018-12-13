import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Nav from './Nav.jsx';
import { getUserCar, getUserLoading } from '../../store/resources/cars/selectors';
import { fetchCar, postCar } from '../../store/resources/cars/actions';
import { ROUTES } from '../../routes';
import { Redirect } from 'react-router-dom';

const StyledForm = styled.form`
  overflow: hidden;
  width: 100vw;
  position: absolute;
  top: 25px;
  background: none;
  h3 {
    color: ${({ theme }) => theme.secondary};
    text-align: center;
    font-weight: bolder;
  }
`;
const LabelInputContainer = styled.div`
  input {
    background: none;
    color: inherit;
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
  }

  background: none;
  color: inherit;
  text-align: center;
  font: inherit;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  left: 20vw;
  position: relative;
  width: 100vw;
  height: 34px;
  margin: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  background: none;
  color: ${({ theme }) => theme.accentcolor};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 55px;
  font: inherit;
  cursor: pointer;
  width: 40vw;
  height: 20vh;
  margin-top: 50px;
`;

class AddCar extends Component {
  state = {
    plate: '',
    make: '',
    model: '',
    seats: '',
    redirect: false
  };

  saveCar = event => {
    event.preventDefault();
    const { plate, make, model, seats } = this.state;
    this.props.deleteCar(this.props.user._id)
      .then(() => {
        this.props.postCar({
          userId: this.props.user._id,
          plate,
          make,
          model,
          seats
        });
      });
    this.setState({ redirect: true });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value.toUpperCase() });
  };

  render() {
    if(this.props.loading) return <h1> LOADING </h1>;
    if(this.state.redirect) return <Redirect to={ROUTES.PROFILE.linkTo()} />;

    return (
      <>
        <Nav pageTitle="Add A Car" />
        <StyledForm onSubmit={this.saveCar}>
          <h3>Register Car</h3>
          <LabelInputContainer>
            <label htmlFor="make">Make:&nbsp;&nbsp;</label>
            <input
              name="make"
              type="text"
              value={this.state.make}
              onChange={this.handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="model">Model:&nbsp;&nbsp;</label>
            <input
              name="model"
              type="text"
              value={this.state.model}
              onChange={this.handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="plate">Plate:&nbsp;&nbsp;</label>
            <input
              name="plate"
              type="text"
              value={this.state.plate}
              onChange={this.handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="seats">Seats:&nbsp;&nbsp;</label>
            <input
              name="seats"
              type="number"
              value={this.state.seats}
              onChange={this.handleChange}
            />
          </LabelInputContainer>
          <ButtonWrapper>
            <Button type="submit">Register</Button>
          </ButtonWrapper>
        </StyledForm>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: getUserCar(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCar: email => dispatch(fetchCar(email)),
  postCar: car => dispatch(postCar(car)),
  deleteCar: userId => dispatch(deleteCar(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCar);
