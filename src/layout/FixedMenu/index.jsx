import React, { useState, useEffect } from 'react';
import { FixedMenu } from '@1msoft/kant-ui';
import './index.less';
import { Icon } from 'antd';
import { useStore } from '../../stores';

const FinalyFixedMenu = () => {
  const store = useStore();
  const [isChange, setIsChange] = useState(false);
  const [isRetract, setIsRetract] = useState(false);

  const iconDom = (isChange ,mark) => {
    //点击后变化iconanniu-zhanshi  //初始iconanniu-quanping //箭头iconjiantou
    if (mark === 'bottom') {
      let icon = !isChange ? 'iconxiangshang'
        : (!isRetract ? 'iconanniu-quanping' : 'iconanniu-zhanshi');
      return icon ?
        <span className={` kant-bottom-icon iconfont ${icon}`}></span> : null;
    } else if (mark === 'top') {
      let icon = !isChange ? (!isRetract ? 'iconanniu-quanping' : 'iconanniu-zhanshi')
        : 'iconxiangshang';
      return icon ?
        <span className={` kant-top-icon iconfont ${icon}`}></span> : null;
    }
  };

  const onClickHead = (store) => {
    !isChange ? store.menuStatus.setCollapsed() : store.menuStatus.clearCollapsed();
    setIsRetract(!isRetract);
  };

  const changeCollapsed = (store) => {
    setIsChange(!isChange);
    onClickHead(store);
  };

  const FixedMenuDom = (props) => {
    return (
      <div className={`kant-side-block-list`}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            isChange ? props.scrollToTop() : changeCollapsed(store);
          }}
          className={
            `${'kant-side-block-list-weixin'}
            kant-cp `}>
          {iconDom(isChange, 'top')}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            !isChange ? props.scrollToTop() : changeCollapsed(store);
          }}
          className={
            `${'kant-side-block-list-arrow'}
            kant-cp`}>
          {iconDom(isChange, 'bottom')}
        </div>
      </div>
    );
  };
  return (
    <FixedMenu
      className="kant-fixedmenu-position"
      visibilityHeight={300}
      display="always"
      speed={20}
    >
      {FixedMenuDom}
    </FixedMenu>
  );
};

export default () => (
  <FinalyFixedMenu></FinalyFixedMenu>
);
