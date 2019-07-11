import React from 'react';

import '../index.less';

const renderDom = (data, isEnd) => {
  const { title, content } = data;
  const dom = (
    <div key={data.key || title}>
      <div className={`${isEnd && 'skeleton-end-title'} skeleton-title`}>
        <span className="skeleton-title-solid"></span>
        <span className="skeleton-title-dot"></span>
        {title}
      </div>
      {
        content &&
        <div className="skeleton-content">
          {content}
        </div>
      }
    </div>
  );
  return dom;
};

/**
 * @param {Object} props 参数
 * @param {Object} props.dataSource=[] 数据
 * @param {Object} props.dataSource.title 小标题
 * @param {string|ReactDOM} props.dataSource.content 主题内容
 */
const Skeleton = (props) => {
  const { dataSource = [] } = props; 
  return (
    <div className="skeleton-layout">
      {
        dataSource.map((item, index) => renderDom(item, index === dataSource.length - 1))
      }
    </div>
  );
};

export default Skeleton;
