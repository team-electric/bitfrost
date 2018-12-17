import React from 'react';
import { shallow } from 'enzyme';
import LinkButton from '../LinkButton.jsx';

describe('<LinkButton />', () => {
  test('renders', () => {
    const path = '/nowhere';
    const label = 'Go here';
    const wrapper = shallow(
      <LinkButton
        path={path}
        label={label}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
