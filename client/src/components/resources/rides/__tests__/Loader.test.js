import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader.jsx';

describe('<Loader />', () => {
  test('renders', () => {
    const src = 'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif';
    const wrapper = shallow(
      <Loader
        src={src}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
