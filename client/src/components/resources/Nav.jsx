import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/index.js';

const StyledHeader = styled.header`
border-bottom: 1px solid ${({ theme }) => theme.accentlight};
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledLogo = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;

const StyledIcons = styled.nav`
  display: flex;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.secondary};
  }
`;
const StyledTitle = styled.span`
  font-size: 1em;
  flex-direction: row;
  justify-content: space-between;
`;

const Nav = ({ pageTitle }) => {

  return (
    <StyledHeader>
      <StyledLogo>
        <Link to={ROUTES.ABOUT.linkTo()}>LOGO</Link>
      </StyledLogo>
      <StyledTitle>{pageTitle}</StyledTitle>
      <StyledIcons>
        <Link to={ROUTES.PROFILE.linkTo()}>PROF</Link>&nbsp;
        <Link to={ROUTES.DASHBOARD.linkTo()}>DASH</Link>
      </StyledIcons>
    </StyledHeader>
  );
};

export default Nav;
