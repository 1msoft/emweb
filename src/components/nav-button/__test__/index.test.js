import React from 'react';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import NavButton from '../index';

const { mount, shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('nav-button', () => {
  it('组件测试', () => {
    const wrapper = mount(
      <NavButton />
    );
    wrapper.find('.sub-system').simulate('mouseover');
    wrapper.find('.sub-system').simulate('mouseleave');
    wrapper.find('.sub-system-inner-layer').simulate('click');
    assert.equal(wrapper.find('.sub-system-hide').length, 1);
    wrapper.find('.system-list-close').simulate('mouseover');
    wrapper.find('.system-list-close').simulate('click');
    assert.equal(wrapper.find('.sub-system-show').length, 1);
  });
});