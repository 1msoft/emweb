import React, { useState, useEffect } from 'react';
import { useObserver } from "mobx-react-lite";
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import { ContainerQuery } from "react-container-query";
import classNames from 'classnames';
import useMedia from 'react-media-hook2';

import { Layout } from 'antd';
import Header from './Header';
import SideMenu from './SideMenu';
import Content from './Content';
import FixedMenu from './FixedMenu';

import Store, { useStore } from '../stores/AppFrame';
import './index.less';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

// 获取有效路由列表
const getRouters = (routers) => {
  const routerList = [];
  for (let router of Object.keys(routers)) {
    routers[router].path &&
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
    if (parentName !== 'Index' && val) {
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
  const routeHelper = store.routeHelper;

  // 当前路由
  const currRoute = routeHelper.matchRoute(location.pathname);
  const currRouteName = currRoute ? currRoute.routeName : null;

  // 根目录路由
  let rootRoute = routeHelper.findRouteByName('Index');
  let rootRouteName = rootRoute ? rootRoute.routeName : null;

  const leftNavInfo = routeHelper.getRouteTree(rootRouteName, currRouteName);

  const routerTree = getRouteTree(leftNavInfo.routeTree);

  const routerList = getRouters(routeHelper._routes);

  const breadcrumbs = getRouterChain(currRoute, routeHelper._routes);

  const [collapse, useCollapse] = useState(false);
  const isValidScreenSm = useMedia({
    id: 'side-menu',
    query: { maxWidth: 767, minWidth: 575 }
  })[0];
  useEffect(() => {
    if (
      isValidScreenSm &&
      !(document.querySelectorAll('.ant-layout-sider-collapsed') || []).length
    ) {
      document.querySelectorAll('.kant-head-icon')[0].click();
    }
  }, [isValidScreenSm]);
  return (
    <Layout className="container">
      {/* 左侧边栏 */}
      <SideMenu
        {...props}
        collapse={collapse}
        useCollapse={useCollapse}
        selectKeys={leftNavInfo.selectedKeys}
        openKeys={leftNavInfo.openKeys}
        dataSource={routerTree} />
      {/* 主内容 */}
      <Content
        {...props}
        useCollapse={useCollapse}
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
    window.addEventListener('resize', changeRootFontSize);
    return () => window.removeEventListener('resize', changeRootFontSize);
  });

  const isMobile = useMedia({
    id: 'wrapper',
    query: '(max-width: 575px)'
  })[0];
  return (
    <Store>
      <Router>
        <ContainerQuery query={query}>
          {
            params => (
              <Layout className={classNames(params, 'wrapper')}>
                <Header isMobile={isMobile} />

                <SideMenuContent isMobile={isMobile} />

                <FixedMenu />
              </Layout>
            )
          }
        </ContainerQuery>
      </Router>
    </Store>
  );
};
