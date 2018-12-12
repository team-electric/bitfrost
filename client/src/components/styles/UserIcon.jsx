import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  box-sizing: border - box;

  text-decoration: none;
  color: ${ ({ theme }) => theme.secondary};
  margin: 5px;
  padding: 8px;
  border: 1px solid white;

  &:hover {
    color: ${ ({ theme }) => theme.darksecondary};
    border: 1px solid ${ ({ theme }) => theme.darksecondary};
  }
`;

const UserImg = ({ id,  }) => {
  return <StyledLink to={path}>{label}</StyledLink>;
};


LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default LinkButton;
