import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';
import Header from './Header';
import SideMenu from './SideMenu';
import Content from './Content';
import FixedMenu from './FixedMenu';

import './index.less';

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

  return (
    <Router>
      <Layout className="wrapper">

        {/* 头部 */}
        <Header />

        <Layout className="container">
          {/* 左侧边栏 */}
          <SideMenu />

          {/* 主内容 */}
          <Content />
        </Layout>

        <FixedMenu />
      </Layout>
    </Router>
  );
};
