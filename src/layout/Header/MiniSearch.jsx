import React, { Fragment, useState } from 'react';
import { Icon } from 'antd';

import FullSearch from '@components/full-search';
import './MiniSearch.less';

export default () => {
  const [visible, useVisible] = useState(false);

  const toggleModal = () => useVisible(!visible);
  const records = [
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单', path: '/' },
    { title: '订单查询',  path: '/home' },
    { title: '订单查询',  path: '/home' },
    { title: '订单查询',  path: '/home' },
    { title: '订单查询',  path: '/home' },
  ];
  return (
    <Fragment>
      <span
        onClick={toggleModal}
        className="mini-search-container">
        <span className="inner-box">
          <Icon
            type="search"
            className="search"
          />
        </span>
      </span>
      {
        visible ?
          <div className="full-search-modal">
            <div className="valid-operation-area">
              <FullSearch
                autoFocus={true}
                records={records}
                recommends={records.map(i => i.title)}
              />
            </div>
            <div
              onClick={toggleModal}
              className="valid-close-area"></div>
          </div> : null
      }
    </Fragment>
  );
};
