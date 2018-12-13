import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// const StyledDiv = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 18px;
//   height: 18px;
//   background-color: rgb(116, 128, 250);
//   border: 2px solid #fff;
//   border-radius: 100%;
//   user-select: none;
//   transform: translate(-50%, -50%);
//   cursor: pointer;
//   /* cursor: ${props => (props.onClick ? 'pointer' : 'default')}; */
//   &:hover {
//     opacity: 50%;
//     z-index: 1;
//   }
// `;
const StyledButton = styled.button`
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
  cursor: pointer;
  /* cursor: ${props => (props.onClick ? 'pointer' : 'default')}; */
  &:hover {
    opacity: 50%;
    z-index: 1;
  }
`;

const Marker = props => {

  // console.log(props);

  return (
    <StyledButton
      alt={props.seats ? `seats: ${props.seats}` : props.text }
      {...props.onClick ? { onClick: props.onClick } : {}}
      value={props.ride ? props.ride : {}}
    />
  );
}


Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Marker;
