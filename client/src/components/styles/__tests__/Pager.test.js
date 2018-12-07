import React from 'react';
import { shallow } from 'enzyme';
import Pager from '../Pager.jsx';

describe('<Pager />', () => {
  test('renders', () => {
    const updatePageFn = jest.fn();

    const wrapper = shallow(
      <Pager
        currentPage={1}
        totalPages={10}
        updatePage={updatePageFn}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
