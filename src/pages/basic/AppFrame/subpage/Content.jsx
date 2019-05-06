import _ from 'lodash';
import { Layout } from 'antd';
import React, { Component } from 'react';
import * as components from '../../..';
import { withRouter } from 'react-router-dom';
import ContentBlock from '../../../../components/layout/ContentBlock';

@withRouter
class Content extends Component {

  getRoutes = (routes) => {
    const routeList = [];
    const getRoute = (routes) => {
      routes.map(item => {
        if (item.component && components[item.component]){
          item.component = components[item.component]
        }
        if (item.children) {
          getRoute(item.children);
        }
        routeList.push(item);
        return null;
      });
    }
    getRoute(routes);
    return routeList;
  }

  render() {
    const setting = this.setting;
    return (
      <Layout.Content>
        <ContentBlock
          routes={setting.routeList}
          root={setting.subRootRoute}
          current={setting.currRoute} />
      </Layout.Content>
    );
  }

  get setting(){
    const { location } = this.props;
    const routeHelper = this.props.routeHelper
    // 当前路由
    const currRoute = routeHelper.matchRoute(location.pathname);
    const currRouteName = currRoute ? currRoute.routeName : null;
    // 根目录路由
    let rootRoute = routeHelper.findRouteByName('Index');
    let rootRouteName = rootRoute ? rootRoute.routeName : null;
    // 左侧导航菜单
    let { routeTree = [], selectedKeys = []} = routeHelper.getRouteTree(
      rootRouteName, 
      currRouteName, 
      { cascade: true }
    );
    // 一级根路由
    let subRootRoute = routeTree.find((item) => item.routeName === selectedKeys[0]);
    // 页面路由列表
    const contentRoutes = routeHelper.getComponentRouteList(rootRouteName, { cascade: true });
    //扁平化所有路由
    let routeList = this.getRoutes(contentRoutes).filter(item => item.component);
    return { routeList, subRootRoute, currRoute };
  }
}

export default Content;
