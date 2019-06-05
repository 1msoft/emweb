import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout, Spin } from 'antd';
import Header from './Header';
import SideMenu from './SideMenu';
import Content from './Content';
import { useObserver } from "mobx-react-lite";

import { useStore } from '../stores';
import './index.less';

export default () =>  useObserver(() => {
  const store = useStore();
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

  return (
    <Router>
      <Spin size="large" spinning={store.spin.loading}>
        <Layout className="wrapper">
          {/* 头部 */}
          <Header />
          <Layout className="container">
            {/* 左侧边栏 */}
            <SideMenu />
            {/* 主内容 */}
            <Content />
          </Layout>
        </Layout>
      </Spin>
    </Router>
  );
});
