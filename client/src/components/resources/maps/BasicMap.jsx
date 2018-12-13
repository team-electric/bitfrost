import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const StyledDiv = styled.main`
  width: 100%;
  height: 50%;
`;

const BasicMap = ({ children, ...props }) => (
  <StyledDiv>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
      {...props}
    >
      {!!children && children}
    </GoogleMapReact>
  </StyledDiv>
);

BasicMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

BasicMap.defaultProps = {
  children: null,
};

export default BasicMap;
