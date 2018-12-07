import React from 'react';
import { shallow } from 'enzyme';
import App from '../App.jsx';


describe('<App />', () => {
  test('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
