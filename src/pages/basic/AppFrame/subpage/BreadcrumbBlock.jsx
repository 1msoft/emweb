import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Breadcrumb from '../../../../components/layout/Breadcrumb';

@withRouter
class BreadcrumbBlock extends Component {

  getBreadcrumbs = (routes, parent, breadcrumbs) => routes.map(route => {
    if (route.routeName === parent) {
      if (route.parent && route.parent !== 'Index') {
        this.getBreadcrumbs(routes, route.parent);
      }
      breadcrumbs.push(route);
    }
    return null;
  });

  getRoutes = (routes) => {
    const routeList = [];
    const getRoute = (routes) => {
      routes.map(item => {
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
    return (
      <Breadcrumb
        style={{
          color: '#666',
          height: '60px',
          background: '#fff',
          paddingLeft: '20px',
          lineHeight: '60px',
        }}
        breadcrumbs={this.breadcrumbs}
      />
    );
  }

  get breadcrumbs(){
    const breadcrumbs = [];
    // 当前路由
    const currRoute = this.props.routeHelper.matchRoute(this.props.location.pathname);
    // 根目录路由
    let rootRoute = this.props.routeHelper.findRouteByName('Index');
    let rootRouteName = rootRoute ? rootRoute.routeName : null;
    // 页面路由列表
    const contentRoutes = this.props.routeHelper.getComponentRouteList(
      rootRouteName,
      { cascade: true }
    );
    //扁平化所有路由
    const routeList = this.getRoutes(contentRoutes).filter(item => item.component);
    this.getBreadcrumbs(routeList, currRoute.parent, breadcrumbs);
    breadcrumbs.push(currRoute);
    return breadcrumbs;
  }
}

export default BreadcrumbBlock;
