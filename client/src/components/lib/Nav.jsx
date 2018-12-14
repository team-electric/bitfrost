import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';

const StyledHeader = styled.header`
  border-bottom: 2px solid ${({ theme }) => theme.accentcolor};
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledLogo = styled.div`
  position: relative;
  left: 10px;
  a {
    font-size: 1.2em;
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;

const StyledIcons = styled.nav`
  position: relative;
  right: 10px;
  a {
    font-size: 1.2em;
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;
const StyledTitle = styled.span`
  display: flex;
  align-self: center;
  justify-self: center;
  font-size: 1em;
  font-weight: bold;
`;

const Nav = ({ pageTitle }) => {
  return (
    <StyledHeader>
      <StyledLogo>
        <Link to={ROUTES.ABOUT.linkTo()}>
          <i className="fas fa-road" />
        </Link>
      </StyledLogo>
      <StyledTitle>{pageTitle}</StyledTitle>
      <StyledIcons>
        <Link to={ROUTES.RIDE_DISPLAY.linkTo()}><i className="fas fa-map-marked-alt"></i></Link>
      </StyledIcons>
    </StyledHeader>
  );
};

export default Nav;
