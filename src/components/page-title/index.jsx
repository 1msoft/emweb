import React from 'react';
import './index.less';

/**
 * 页面标题 通用
 * @param {*} props
 * @param {String} props.title  页面标题
 * @param {String} props.iconName  页面标题
 * @param {String|ReactDOM} props.intro  页面简介
 */
const PageTitle = (props) => {
  const { title, iconName = 'iconicon1' } = props;
  return (
    <div className="page-title-content">
      <div>
        <i className={`iconfont ${iconName} page-title-icon`}></i>
        <span className="page-title">
          {title}
        </span>
      </div>
      <div className="page-title-intro">{props.intro}</div>
    </div>
  );
};

export default PageTitle;
