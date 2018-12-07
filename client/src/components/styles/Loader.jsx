import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImg = styled.img`
  object-fit: contain;
`;

const Input = ({ src }) => {

  return (
    <StyledImg
      src={src}
      alt={'loading'}
    />
  );
};

Input.propTypes = {
  src: PropTypes.string.isRequired
};

export default Input;
