import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../../lib/Nav.jsx';
import { ROUTES } from '../../../routes/index.js';
import { Link } from 'react-router-dom';

const MapWrapper = styled.div`
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  img {
    width: 100vw;
    height: auto;
  }
`;

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

export default class PastTrips extends PureComponent {
  // static propTypes = {
  //   lots o props
  // }
  render() {

    return (
      <Fragment>
        <Nav pageTitle="Past Trips" />
        <MapWrapper>
          <img src="https://staticmapmaker.com/img/google.png"></img>
        </MapWrapper>
        <StyledDiv>
          <h1>
            Google map with the most recent route shown. user Icon, List of past
            trips here, linking to detail view of a trip.
          </h1>
          <TripsContainer>
            <ol>
              <li>
                <Link to={ROUTES.RIDE_DETAIL.linkTo()}>
                  <Button>David Chang - Montreal - 9.11.21 </Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RIDE_DETAIL.linkTo()}>
                  <Button>Michael Corbin - Washginton DC - 11.21.19</Button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RIDE_DETAIL.linkTo()}>
                  <Button>Jack Sparkling - Portlandia - 9.11.21 </Button>
                </Link>
              </li>
            </ol>
          </TripsContainer>
        </StyledDiv>
      </Fragment>
    );
  }
}
