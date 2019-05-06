import React, { Component, useState, useCallback } from 'react';
import _ from 'lodash';
import { Layout } from 'antd';
import Content from './subpage/Content';
import GuidePage from './subpage/GuidePage';
import SiderBlock from './subpage/SiderBlock';
import HeaderBlock from './subpage/HeaderBlock';
import { Link } from 'react-router-dom';
import BreadcrumbBlock from './subpage/BreadcrumbBlock';
import RouteHelper from '../../../utils/RouteHelper';
import { private as routes } from '../../../config/routes';
import LoadingSpin from '../../../components/layout/LoadingSpin';

const routeHelper = new RouteHelper({ routes });

// 侧边菜单栏 store
const useSiderStore = () => {
  const [ collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  });
  return { collapsed, toggleCollapsed };
}

export default () => {
  const siderStore = useSiderStore();

  return (
    <div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0}}>
      <Layout style={{ minHeight: '100%' }}>
        <GuidePage />
        <LoadingSpin size="large" spinning={false} />
        <SiderBlock routeHelper = {routeHelper} siderStore = {siderStore}/>
        <Layout style={{ minWidth: 1000, width: '100%', minHeight: '100%'}}>
          <HeaderBlock siderStore = {siderStore}/>
          <BreadcrumbBlock routeHelper = {routeHelper}/>
          <Content routeHelper = {routeHelper} />
          <Layout.Footer style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '10px' }}>
              <Link style={{ color: '#999a9b', padding: '0 20px' }} to="/">帮助</Link>
              <Link style={{ color: '#999a9b', padding: '0 20px' }} to="/">隐私</Link>
              <Link style={{ color: '#999a9b', padding: '0 20px' }} to="/">条款</Link>
            </div>
            <div style={{ color: '#999a9b' }}>Copyright &copy; 2018 福建英迈软件有限公司</div>
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
};
