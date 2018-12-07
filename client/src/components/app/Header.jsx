import React from 'react';
import styled from 'styled-components';
import LinkButton from '../styles/LinkButton.jsx';
import { LINKS } from '../../routes';

const StyledHeader = styled.header`
  background-color: ${ ({ theme }) => theme.primary };
  color: ${ ({ theme }) => theme.secondary };

  h1 {
    font-family: BOMBARD, "Avenir Next", sans-serif;
    font-weight: bolder;
    letter-spacing: 2px;
    font-size: 36px;
  }
`;

const StyledNav = styled.nav`
  margin: 0px 0px 15px 0px;
`;

const Header = () => {

  const LinkComponents = LINKS.map(link => {
    return <LinkButton key={link.label} path={link.path} label={link.label}/>;
  });

  return (
    <StyledHeader>
      <h1>Bitfrost</h1>
      <h3>It's good enough for Thor</h3>
      <StyledNav>
        {LinkComponents}
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
