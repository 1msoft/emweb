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
    wrapper.find('.nav-button').simulate('mouseover');
    wrapper.find('.nav-button').simulate('mouseleave');
    wrapper.find('.nav-button-inner-layer').simulate('click');
    assert.equal(wrapper.find('.nav-button-hide').length, 1);
    wrapper.find('.nav-shade-close').simulate('mouseover');
    wrapper.find('.nav-shade-close').simulate('click');
    assert.equal(wrapper.find('.nav-button-show').length, 1);
  });
});