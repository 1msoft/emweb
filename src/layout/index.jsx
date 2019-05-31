import React, {
  Fragment,
  useEffect
} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from './subpage/Route';

import { Layout, Breadcrumb, Menu, Icon, Divider } from 'antd';
import './index.less';

import Notification from './subpage/Notification';
import UserCenter from './subpage/UserCenter';
import HeaderSearch from '@components/header-search';

const {
  Header,
  Sider,
  Content,
  Footer,
} = Layout;

export default () => {
  const changeRootFontSize = () => {
    const curScrollWidth = document.body.scrollWidth;
    let fontSize = curScrollWidth / 1920 * 16;
    if (fontSize < 12) { fontSize = 12; }
    document.querySelector('html').style.fontSize = `${fontSize}px`;
  };

  useEffect(() => {
    changeRootFontSize();
    window.onresize = changeRootFontSize;
    return () => changeRootFontSize;
  });

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
    <Router>
      <Fragment>
        <Layout className="wrapper">
          {/* 头部 */}
          <Header className="header">
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

          <Layout className="container">
            {/* 左侧边栏 */}
            <Sider>
              <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                  <Icon type="user" />
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <Link to="/404">404</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout className="main-content">
              {/* 面包屑 */}
              <Breadcrumb
                className="bread-crumb"
                style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Breadcrumb>

              {/* 内容主题 */}
              <Content className="content">
                <Route />
              </Content>

              {/* 尾部 */}
              <Footer className="footer">
                技术支持：福建英迈软件有限公司<br/>
                Copyright © 2019 Emsoft Incorporated. All rights reserved.
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Fragment>
    </Router>
  );
};
