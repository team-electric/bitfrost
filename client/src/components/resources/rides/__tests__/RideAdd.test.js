import React from 'react';
import { shallow } from 'enzyme';
import { RideCreate } from '../RideCreate.jsx';

describe('<RideCreate />', () => {
  test('renders', () => {
    const fetchCar = jest.fn();
    const user = { _id: 'abc' };

    const wrapper = shallow(
      <RideCreate
        fetchCar={fetchCar}
        user={user}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
