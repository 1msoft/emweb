/**
 * 头部查询块组件
 */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
import { omit } from 'lodash';
import './index.less';

const useStateHook = (props) => {
  const inputRef = useRef(null);
  const [isAction, setIsAction] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState(void 0);
  const searchRef = useRef();

  const toggleModal = status => {
    if (isShow) return;
    setIsAction(status);
    setTimeout(() => setIsShow(status), 500);
  };

  // 输入框：change 事件
  const onChange = useCallback((e) => {
    const value = e.target ? e.target.value : e;
    setValue(value);
    props.onChange && props.onChange(value);
    // toggleModal(!!value);
  }, []);

  // 输入框: 回车事件
  const onPressEnter = useCallback((e) => {
    props.onPressEnter && props.onPressEnter(e.target.value);
  }, []);

  // 搜索记录点击事件：
  const onClickRecord = useCallback((value) => {
    onChange(value);
  }, []);

  // 搜索列表点击事件：
  const onClickRecommend = useCallback((value) => {
    onChange(value);
  });

  useEffect(() => {
    inputRef.current.focus();
    toggleModal(true);
  });

  return {
    value,
    isShow,
    isAction,
    inputRef,
    onChange,
    searchRef,
    onPressEnter,
    onClickRecommend,
    onClickRecord,
    records: (props.records || []).length ? props.records : ['无搜索记录'],
    recommends: props.recommends || [],
  };
};

/**
 * 头部查询组件
 * @param {Object}   props
 * @param {Array}    [props.records]           搜索列表
 * @param {Array}    props.records.title       搜索列表 - 列表名称
 * @param {Array}    props.records.path        搜索列表 - 列表点击时需要跳转路由
 * @param {Array}    [props.recommends]        搜索记录（字符串数组），例: ['管理', '订单']
 * @param {Function} [props.onChange]          输入框内容改变触发该事件函数
 * @param {Function} [props.onPressEnter]      输入框回车触发该事件函数
 * @param {Function} [props.onClick]           搜索列表点击触发该事件函数
 *
 */
export default (props) => {
  const state = useStateHook(props);
  console.log(state, '==');

  const warpperClassNames = classNames(
    'emweb-full-search',
    `emweb-full-search-${state.isAction ? 'show' : 'hidden'}`,
  );
  const viewClassNames = classNames(
    'emweb-full-search-modal',
    { 'show-modal': state.isShow },
  );
  return (
    <div
      ref={state.searchRef}
      className={warpperClassNames}
    >
      <Input
        ref={state.inputRef}
        value={state.value}
        onChange={state.onChange}
        onPressEnter={state.onPressEnter}
        prefix={<i className={`iconfont iconsousuo`} />}
        {...omit(props, ['records', 'recommends'])}
      />

      <div className={viewClassNames}>
        {
          state.value ?
            <div className="full-search">
              <div className="title">搜索记录</div>
              <div className="list clearfix">
                {
                  state.records.map((record, index) => (
                    <Button
                      key={index}
                      shape="round"
                      onClick={state.onClickRecord.bind(null, record.title)}
                      className={classNames(
                        'item',
                        { 'active': state.value === record.title },
                      )}>
                      {record.title}
                    </Button>
                  ))
                }
              </div>
            </div> : null
        }
        <div className="recommend-list">
          <div className="title">搜索推荐</div>
          <div className="list clearfix">
            {
              state.recommends.map((item, index) => (
                <Button
                  key={index}
                  shape="round"
                  className="item"
                  onClick={state.onClickRecommend.bind(null, item)}
                >
                  {item}
                </Button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
