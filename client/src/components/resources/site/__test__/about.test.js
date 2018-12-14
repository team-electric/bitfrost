import React from 'react';
import { shallow } from 'enzyme';
import About from '../About';

describe('<About />', () => {
  test('renders about info', () => {
    const wrapper = shallow(
      <div>
        <h2>About our Team</h2>
        <div>
          <div>
            <div>
              <img src='https://avatars3.githubusercontent.com/u/33019742?s=460&v=4' />
            </div>
            <div>
              <h3>
                <a href='https://github.com/RyLuras'>
                  Ryan Luras &nbsp;: :&nbsp; GitHub
                </a>
              </h3>
              <p>
                The stylist, the perfectionist, the one, the only, Ryan the
                maveric lionesta!
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src='https://avatars0.githubusercontent.com/u/11794494?s=400&v=4' />
            </div>
            <div>
              <h3>
                <a href='https://github.com/miloofcroton'>
                  Jack Toumey &nbsp;: :&nbsp; GitHub
                </a>
              </h3>
              <p>
                Jack! Jack! He's our man, if he can't crack it, no one
                can!!!....GO JACK!
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src='https://avatars2.githubusercontent.com/u/34200452?s=460&v=4' />
            </div>
            <div>
              <h3>
                <a href='https://github.com/DavidChhing'>
                  David Chhing &nbsp;: :&nbsp; GitHub
                </a>
              </h3>
              <p>
                Oregon born native that loves the ourdoor and is highly
                competitive in any sports or activites. He holds a combined
                total of four trophies in ping pong with two being 1st place.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
