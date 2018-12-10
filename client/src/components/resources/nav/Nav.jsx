import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/index.js';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h1 {
    font-family: BOMBARD, "Avenir Next", sans-serif;
    font-weight: bolder;
    letter-spacing: 2px;
    font-size: 36px;
  }
`;
const StyledLogo = styled.div`
  font-weight: bolder;
`;

const StyledIcons = styled.nav`
  display: flex;

`;
const StyledTitle = styled.span`
  font-weight: bolder;
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
