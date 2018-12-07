import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  justify-self: start;
  margin: 5px;

  [type=text] {
    width: 100%;
  }
`;

const StyledLabel = styled.label`
  justify-self: end;
  margin: 5px;
`;

const Input = ({ onChange, resource, name }) => {

  const label = name.slice(0, 1).toUpperCase() + name.slice(1);

  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        name={name} type="text"
        value={resource} onChange={onChange}
      ></StyledInput>
    </>
  );
};

Input.propTypes = {
  resource: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
