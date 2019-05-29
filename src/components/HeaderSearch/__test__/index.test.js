import React from 'react';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'antd';

const { mount, shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('组件内部测试', () => {
    const wrapper = mount(
      <Button>测试按钮</Button>
    );
    assert.equal(wrapper.find('.ant-btn').length, 1);
    assert.equal(wrapper.find('.ant-btn span').text(), '测试按钮');
  });
});
