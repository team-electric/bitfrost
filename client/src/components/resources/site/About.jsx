import React from 'react';
import Nav from '../../lib/Nav.jsx';
import styled from 'styled-components';

const AboutBox = styled.div`
  height: 100vh;
  width: 100vw;
  h2 {
    text-align: center;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: space-around;
  h3 {
    line-height: 1em;
  }
`;
const Profile = styled.div`
  display: flex;
  width: 100vw;
  height: 25vh;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
`;
const ImgDiv = styled.div`
  padding: 5px;
  img {
    width: 40vw;
    height: 40vw;
  }
`;
const InfoDiv = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accentcolor};
    cursor: pointer;
  }
  position: relative;
  top: -20px;
  padding: 5px;
`;
const About = () => {
  return (
    <AboutBox>
      <Nav pageTitle='About' />
      <h2>About our Team</h2>
      <ProfileBox>
        <Profile>
          <ImgDiv>
            <img src='https://avatars3.githubusercontent.com/u/33019742?s=460&v=4' />
          </ImgDiv>
          <InfoDiv>
            <h3>
              <a href='https://github.com/RyLuras'>
                Ryan Luras &nbsp;: :&nbsp; GitHub
              </a>
            </h3>
            <p>
              With a background in Art and Design, Ryan enjoys developing his skills in the App developemnt world.
            </p>
          </InfoDiv>
        </Profile>
        <Profile>
          <ImgDiv>
            <img src='https://avatars0.githubusercontent.com/u/11794494?s=400&v=4' />
          </ImgDiv>
          <InfoDiv>
            <h3>
              <a href='https://github.com/miloofcroton'>
                Jack Toumey &nbsp;: :&nbsp; GitHub
              </a>
            </h3>
            <p>
              Jack is energetic member of the Bitfrost team. He brings good country music tunes and knowledge of the entire software stack. When not programming, he likes lifting weights and playing board games.
            </p>
          </InfoDiv>
        </Profile>
        <Profile>
          <ImgDiv>
            <img src='https://avatars2.githubusercontent.com/u/34200452?s=460&v=4' />
          </ImgDiv>
          <InfoDiv>
            <h3>
              <a href='https://github.com/DavidChhing'>
                David Chhing &nbsp;: :&nbsp; GitHub
              </a>
            </h3>
            <p>
              Oregon born native that loves the ourdoor and is highly
              competitive in any sports or activites. He holds a combined total
              of four trophies in ping pong with two being 1st place.
            </p>
          </InfoDiv>
        </Profile>
      </ProfileBox>
    </AboutBox>
  );
};

export default About;
