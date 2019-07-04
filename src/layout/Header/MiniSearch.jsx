import React from 'react';
import { Icon } from 'antd';
import './MiniSearch.less';

export default () => {
  return (
    <span className="mini-search-container">
      <span className="inner-box">
        <Icon
          type="search"
          className="search"
          onClick={() => {}}
        />
      </span>
    </span>
  );
};
