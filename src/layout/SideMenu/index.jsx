import React from 'react';

import { SideMenu } from '@1msoft/kant-ui';

import './index.less';

export default (props) => {
  return (
    <SideMenu
      useCollapsed={true}
      selectedKeys={props.selectKeys}
      openKeys={props.openKeys}
      dataSource={props.dataSource}
      inlineOpenStyle="normal"
      onJumpway={(url) => { props.history.push(url); }}
      siderProps={{ theme: 'light' }}
    />
  );
};
