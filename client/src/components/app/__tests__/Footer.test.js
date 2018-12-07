import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer.jsx';

describe('<Footer />', () => {
  test('renders', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
