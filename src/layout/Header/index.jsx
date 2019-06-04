import React from 'react';
import NavButton from '@components/nav-button/index';

import { Divider } from 'antd';
import { Header } from '@1msoft/kant-ui';

import Notification from './Notification';
import UserCenter from './UserCenter';
import HeaderSearch from '@components/header-search';

import './index.less';
import logo from '@assets/images/logo.png';

export default () => {
  const searchList = [
    {
      title: '订单',
      path: '/',
    },
    {
      title: '订单查询',
      path: '/home',
    },
    {
      title: '管理',
      path: '/',
    }
  ];
  const searchRecord = ['订单', '订单查询', '管理', '管理系统查询', '小区', '楼栋', '房屋', '演唱会'];

  return (
    <Header className="header">
      <div className="sub-nav">
        <NavButton />
      </div>
      <Divider
        type="vertical"
        className="between-vertical" />
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="header-search-wrapper">
        <HeaderSearch
          searchList={[]}
          searchRecord={searchRecord}
        />
      </div>
      <div className="header-action">
        <Notification/>
        <Divider type="vertical" className="divider-vertical" />
        <UserCenter />
      </div>
    </Header>
  );
};
