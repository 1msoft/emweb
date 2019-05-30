import React from 'react';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import HeaderSearch from '..';

const { mount, shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('HeaderSearch: 头部搜索栏', () => {

  it('组件是否正确渲染', () => {
    const wrapper = mount(
      <HeaderSearch />
    );
    assert.equal(wrapper.find('.emweb-search').length, 1);
    assert.equal(wrapper.find('.record-item').length, 0);
    assert.equal(wrapper.find('.search-item').length, 0);

    wrapper.find('.ant-input').at(0).simulate('change', {
      target: { value: '订单' }
    });

    wrapper.find('.ant-input').at(0).simulate('keydown', {
      keyCode: 13,
      target: { value: '订单' },
    });
  });

  it('搜索记录是否正确渲染，点击时是否正确执行', () => {
    const searchRecord = ['订单记录', '销售记录'];
    const onChange = sinon.spy();
    const empty = mount(
      <HeaderSearch
        onChange={onChange}
        searchRecord={[]}
      />
    );

    const wrapper = mount(
      <div className="wrapper">
        <HeaderSearch
          onChange={onChange}
          searchRecord={searchRecord}
        />
      </div>
    );

    const env = new Event('click', {});
    document.dispatchEvent(env);

    wrapper.find('.ant-input').at(0).simulate('change', {
      target: { value:  searchRecord[0]}
    });
    assert.equal(wrapper.find('.record-item-action').length, 1);
    assert.equal(wrapper.find('.emweb-search').length, 1);
    assert.equal(wrapper.find('.record-item').length, 2);
    wrapper.find('.record-item').at(0).simulate('click');
    assert.isTrue(onChange.called);

    wrapper.find('.wrapper').at(0).simulate('click');
    assert.equal(wrapper.find('.show-modal').length, 0);

    empty.find('.ant-input').at(0).simulate('click');
    assert.equal(empty.find('.emweb-search').length, 1);
    assert.equal(empty.find('.record-item').length, 0);
  });

  it('搜索列表是否正确渲染，点击时是否正确执行', () => {
    const searchList = [{ title: '订单记录页面' }, { title: '销售记录页面' }];
    const searchRecord = ['订单记录', '销售记录'];
    const onSearchClick = sinon.spy();

    const empty = mount(
      <HeaderSearch
        searchList={[]}
      />
    );

    const wrapper = mount(
      <HeaderSearch
        searchList={searchList}
        searchRecord={searchRecord}
        onSearchClick={onSearchClick}
      />
    );
    wrapper.find('.ant-input').at(0).simulate('click');
    assert.equal(wrapper.find('.emweb-search').length, 1);
    assert.equal(wrapper.find('.search-item').length, 2);
    wrapper.find('.search-item').at(0).simulate('click');
    assert.isTrue(onSearchClick.called);

    assert.equal(empty.find('.search-item').length, 0);
  });

  it('输入框 onChange 事件是否正确执行', () => {
    const onChange = sinon.spy();
    const wrapper = mount(
      <HeaderSearch
        onChange={onChange}
      />
    );
    wrapper.find('.emweb-search').at(0).simulate('click', {
      target: null
    })

    wrapper.find('.ant-input').at(0).simulate('change', {
      target: { value: '订单' }
    });
    assert.isTrue(onChange.calledWith('订单'));
  });

  it('回车事件是否正确执行', () => {
    const onPressEnter = sinon.spy();
    const wrapper = mount(
      <HeaderSearch
        onPressEnter={onPressEnter}
      />
    );
    wrapper.find('.ant-input').at(0).simulate('keydown', {
      keyCode: 13,
      target: { value: '订单' },
    });
    assert.isTrue(onPressEnter.calledWith('订单'));
  });

});
