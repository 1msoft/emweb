import React, { useState } from 'react';

import { Icon } from 'antd';
import { SideMenu } from '@1msoft/kant-ui';
import classNames from 'classnames';

import './index.less';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  const dataSource = [
    {
      key: "homePage",
      title: "首页",
      url: "/home",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module"
    },
    {
      key: "todo",
      title: "待办通知",
      url: "/home",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module"
    },
    {
      key: "archiveManage",
      title: "档案管理",
      url: "/archiveManage",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module",
      child: [{ key: "location", title: "文件", url: "/home" }]
    },
    {
      key: "billManage",
      title: "票据管理",
      url: "/billManage",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module",
      child: [
        { key: "billUse", title: "票据使用", url: "/home" },
        { key: "billQuery", title: "票据查询", url: "/home" },
        { key: "billType", title: "票据类型", url: "/home" }
      ]
    },
    {
      key: "acctNoManage",
      title: "账户管理",
      url: "/acctNoManage",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module",
      child: [
        { key: "acctNoQuery", title: "账户查询", url: "/home" },
        { key: "acctNoDetailQuery", title: "明细查询", url: "/home" }
      ]
    },
    {
      key: "systenManage",
      title: "系统管理",
      url: "/systemManage",
      icon: "iconMail-xiaoxi",
      className: "side-menu-module",
      child: [
        { key: "userManage", title: "用户查询", url: "/home" },
        { key: "roleManage", title: "权限查询", url: "/home" },
        { key: "zoneManage", title: "地区查询", url: "/home" }
      ]
    }
  ];

  const headClassNames = classNames(
    'collapsed-switch',
    { 'collapsed-switch-off': collapsed },
  );
  const headDom = () => {
    return (
      <div className={headClassNames}>
        <Icon
          type="swap"
          className="switch-icon"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    );
  };

  return (
    <SideMenu
      dataSource={dataSource}
      header={headDom()}
      siderProps={{ theme: 'light' }}
      useCollapsed={true}
      isCollapsed={collapsed}
      inlineOpenStyle="normal"
    />
  );
};
