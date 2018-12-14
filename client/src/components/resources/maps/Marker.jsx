import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: rgb(116, 128, 250);
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    opacity: 50%;
    z-index: 1;
  }
`;

const Marker = props => {

  const selectRide = () => {
    props.onClick(props.ride);
    props.history.push(`/ride/${props.id}`);
  };

  return (
    <StyledDiv
      alt={props.seats ? `seats: ${props.seats}` : props.text }
      {...props.onClick ? { onClick: selectRide } : {}}
    />
  );
};


Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Marker;
