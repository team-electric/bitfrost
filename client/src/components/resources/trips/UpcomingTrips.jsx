import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from '../nav/Nav.jsx';

const StyledDiv = styled.div`
  h1 {
    font-weight: bolder;
  }
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
        </StyledDiv>
      </Fragment>
    );
  }
}
