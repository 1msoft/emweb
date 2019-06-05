import React from 'react';
import less from './HeaderBlock.module.less';

let HeaderBlock = (props) => {
  return (
    <div className={less['header']}>
      <i className={`iconfont iconicon1 ${less['header-icon']}`}></i>
      <span className={less['header-text']}>查询表格</span>
    </div>
  );
};

export default HeaderBlock;
