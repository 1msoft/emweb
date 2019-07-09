import React, { useEffect } from 'react';
import { useObserver } from "mobx-react-lite";
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import { Layout } from 'antd';
import Header from './Header';
import SideMenu from './SideMenu';
import Content from './Content';
import FixedMenu from './FixedMenu';
import LoginLoading from './LoginLoading';

import { useStore } from '@stores/';
import './index.less';

// 获取有效路由列表
const getRouters = (routers) => {
  const routerList = [];
  for (let router of Object.keys(routers)) {
    routers[router].parent !== 'Root' && routers[router].path &&
    routerList.push({
      key: router,
      path: routers[router].path,
      exact: routers[router].exact,
      redirect: routers[router].redirect,
      component: routers[router].component,
    });
  }
  return routerList;
};

// 获取页面以及父级页面(链级)
const getRouterChain = (currRoute, routers) => {
  const routerList = [{
    path: currRoute.path,
    text: currRoute.text,
    icon: currRoute.icon,
  }];
  const parent = (parentName) => {
    const val = routers[parentName];
    if (parentName !== 'Index' && val && val.parent !== 'Root') {
      routerList.unshift({
        path: val.path,
        text: val.text,
        icon: val.icon,
      });
      parent(val.parent);
    }
  };
  parent(currRoute.parent);
  return routerList;
};

// 过滤出有效的RouterTree
const getRouteTree = (routeTree = []) => {
  const loop = (data) => {
    return data.map((item, index) => {
      const val = {
        key: item.name,
        title: item.text,
        url: item.path,
        icon: item.icon,
        className: item.className,
      };
      if (item.children) {
        val.child = loop(item.children);
      }
      return val;
    });
  };
  return loop(routeTree);
};

let SideMenuContent = (props) => useObserver(() => {
  const store = useStore();
  const routeHelper = store.appFrame.routeHelper;
  // 当前路由
  const currRoute = routeHelper.matchRoute(props.location.pathname);
  const currRouteName = currRoute ? currRoute.routeName : null;

  // 根目录路由
  let rootRoute = routeHelper.findRouteByName('Index');
  let rootRouteName = rootRoute ? rootRoute.routeName : null;

  const leftNavInfo = routeHelper.getRouteTree(rootRouteName, currRouteName);

  const routerTree = getRouteTree(leftNavInfo.routeTree);

  const routerList = getRouters(routeHelper._routes);

  const breadcrumbs = getRouterChain(currRoute, routeHelper._routes);
  return (
    <Layout className="container">
      {/* 左侧边栏 */}
      <SideMenu
        {...props}
        selectKeys={leftNavInfo.selectedKeys}
        openKeys={leftNavInfo.openKeys}
        dataSource={routerTree} />
      {/* 主内容 */}
      <Content
        routerList={routerList}
        breadcrumbs={breadcrumbs} />
    </Layout>
  );
});

SideMenuContent = withRouter(SideMenuContent);

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
    <Layout className="wrapper">
      {/* 头部 */}
      <Header />
      <SideMenuContent />
      <LoadingBlock />
      <FixedMenu />
    </Layout>
  );
};
