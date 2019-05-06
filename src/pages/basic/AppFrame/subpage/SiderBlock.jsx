import { Layout } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LeftNavMenu from '../../../../components/layout/LeftNavMenu';

@withRouter
class SiderBlock extends Component{

  render(){
    const setting = this.setting;
    const siderStore = this.props.siderStore;
    return (
      <Layout.Sider
        style={{minHeight: '100%'}}
        trigger={null}
        collapsible
        collapsed={siderStore.collapsed}>
        <LeftNavMenu
          openKeys={setting.openKeys}
          navList={setting.leftNavList}
          selectedKeys={setting.leftSelectedKeys} />
      </Layout.Sider>
    );
  }

  get setting(){
    const { location, routeHelper, siderStore } = this.props;
    // 当前路由
    const currRoute = routeHelper.matchRoute(location.pathname);
    const currRouteName = currRoute ? currRoute.routeName : null;
    // 根目录路由
    let rootRoute = routeHelper.findRouteByName('Index');
    let rootRouteName = rootRoute ? rootRoute.routeName : null;
    // 左侧导航菜单
    let { 
      routeTree: leftNavList = [], 
      selectedKeys: leftSelectedKeys = [], 
      openKeys: leftOpenKeys = [] 
    } = routeHelper.getRouteTree(rootRouteName, currRouteName, { cascade: true });
    // 默认跳转至导航菜单第一项
    if (leftSelectedKeys.length === 0 && leftNavList.length > 0) {
      this.props.history.push(leftNavList[0].path);
    }
    const openKeys = siderStore.collapsed ? [] : leftOpenKeys;
    return {openKeys, leftNavList, leftSelectedKeys};
  }
}

export default SiderBlock;
