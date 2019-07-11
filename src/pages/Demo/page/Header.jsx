import React from 'react';
import less from '../index.module.less';

let Header = () => {
  return (
    <div className={less['header']}>
      <i className={`iconfont iconicon1 ${less['header-icon']}`}></i>
      <span className={less['header-text']}>演示</span>
    </div>
  );
};

export default Header;
