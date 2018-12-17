import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input.jsx';

describe('<Input />', () => {
  test('renders', () => {
    const onChange = jest.fn();
    const resource = 'abc';
    const name = 'xyz';
    const wrapper = shallow(
      <Input
        resource={resource}
        name={name}
        onChange={onChange}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
