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
import { Input } from 'antd';
import './index.less';

const useStateHook = (props) => {
  const [isAction, setIsAction] = useState(false);
  const [value, setValue] = useState(void 0);
  const searchRef = useRef();

  // 输入框：change 事件
  const onChange = useCallback((e) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  }, []);

  // 输入框: 回车事件
  const onPressEnter = useCallback((e) => {
    props.onPressEnter && props.onPressEnter(e.target.value);
  }, []);

  // 搜索记录点击事件：
  const onRecordItemClick = useCallback((value, e) => {
    setValue(value);
  }, []);

  // 搜索列表点击事件：
  const onSearchClick = useCallback((value, e) => {
    props.onSearchClick && props.onSearchClick(value);
  }, []);

  // 点击事件
  const onClick = useCallback((e) => {
    document.contains(e.target) &&
    setIsAction(searchRef.current.contains(e.target));
  }, []);

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  });

  return {
    value,
    isAction,
    onChange,
    searchRef,
    onPressEnter,
    onSearchClick,
    onRecordItemClick,
  };
};

/**
 * 头部查询组件
 * @param {Object}   props
 * @param {Array}    [props.searchList]        搜索列表
 * @param {Array}    props.searchList.title    搜索列表 - 列表名称
 * @param {Array}    props.searchList.path     搜索列表 - 列表点击时需要跳转路由
 * @param {Array}    [props.searchRecord]      搜索记录（字符串数组），例: ['管理', '订单']
 * @param {Function} [props.onChange]          输入框内容改变触发该事件函数
 * @param {Function} [props.onPressEnter]      输入框回车触发该事件函数
 * @param {Function} [props.onSearchClick]     搜索列表点击触发该事件函数
 *
 */
export default (props) => {
  const state = useStateHook(props);
  return (
    <div
      ref={state.searchRef}
      className={`emweb-search emweb-search-${state.isAction ? 'show' : 'hidden'}`}
    >
      <Input
        value={state.value}
        onChange={state.onChange}
        onPressEnter={state.onPressEnter}
        prefix={<i className={`iconfont iconsousuo`} />}
      />
      <div className="emweb-search-modal">
        { props.searchList && props.searchList.length > 0 ?
          <div className="search-list">
            { props.searchList.map((v, index) => (
              <div
                key={index}
                className="search-item"
                onClick={state.onSearchClick.bind(null, v)}
              >
                {v.title}
              </div>
            ))}
          </div> :
          <div className="search-record">
            <h2>搜索记录</h2>
            <div className="record-list">
              { (props.searchRecord || []).map((v, index) => (
                <div
                  key={index}
                  onClick={state.onRecordItemClick.bind(null, v)}
                  className={`record-item ${state.value === v && 'record-item-action'}`}>
                  {v}
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
