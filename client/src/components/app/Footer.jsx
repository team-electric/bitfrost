import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${ ({ theme }) => theme.primary };
  p {
      color: ${ ({ theme }) => theme.secondary };
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Made with the utmost seriousness - 2018</p>
    </StyledFooter>
  );
};

export default Footer;
