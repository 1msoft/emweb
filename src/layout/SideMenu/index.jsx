import React from 'react';

import { Drawer } from 'antd';
import { SideMenu } from '@1msoft/kant-ui';

import './index.less';

export default (props) => {
  return props.isMobile ? (
    <Drawer
      visible={props.collapse}
      placement="left"
      closable={false}
      width="auto"
      className="custom-drawer-wrapper"
      onClose={() => props.useCollapse(false)}
    >
      <SideMenu
        useCollapsed={false}
        selectedKeys={props.selectKeys}
        openKeys={props.openKeys}
        dataSource={props.dataSource}
        inlineOpenStyle="normal"
        onJumpway={url => props.history.push(url)}
        siderProps={{ theme: "light" }}
      />
    </Drawer>
  ) : (
    <SideMenu
      useCollapsed={true}
      selectedKeys={props.selectKeys}
      openKeys={props.openKeys}
      dataSource={props.dataSource}
      inlineOpenStyle="normal"
      onJumpway={url => props.history.push(url)}
      siderProps={{ theme: "light" }}
    />
  );
};
