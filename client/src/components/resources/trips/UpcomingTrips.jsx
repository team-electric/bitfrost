import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../Nav.jsx';
import { ROUTES } from '../../../routes/index.js';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
`;

const TripsContainer = styled.div`
    text-align: center;
    li {
      list-style: none;
    }
    a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
    }
    width: 90vw;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 15px;
  font: inherit;
  cursor: pointer;
  width: 100%;
  height: 75px;
  margin-top: 8px;
  padding: 15px;
`;

export default class UpcomingTrips extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }

  render() {
    return (
      <Fragment>
        <Nav pageTitle="Upcoming Trips" />

        <StyledDiv>
          <h1>
            Google map with the most recent route shown. user Icon, List of
            upcoming trips here, linking to detail view of a trip.
          </h1>

          <TripsContainer>
            <h2>UPCOMING TRIPS</h2>
            <ol>
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Jackie Chan - Seattle - 1.1.19  </Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Ryan Luras - Washginton DC - 1.13.19</Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TRIPDETAIL.linkTo()}>
                  <Button>Kurt Russell - Beaverton - 1.15.19 </Button>
                </Link>
              </li>
            </ol>
          </TripsContainer>
        </StyledDiv>
      </Fragment>
    );
  }
}
