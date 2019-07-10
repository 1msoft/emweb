import React from 'react';

import { SideMenu } from '@1msoft/kant-ui';
import { useStore } from '../../stores';
import { useObserver } from "mobx-react-lite";

import './index.less';

export default (props) => useObserver(() => {
  return (
    <SideMenu
      useCollapsed={true}
      selectedKeys={props.selectKeys}
      openKeys={props.openKeys}
      dataSource={props.dataSource}
      inlineOpenStyle="normal"
      onJumpway={(url) => { props.history.push(url); }}
      siderProps={{ theme: 'light' }}
      retractMode={useStore().menuStatus.retract}
      isCollapsed={useStore().menuStatus.collapsed}
    >
    </SideMenu>
  );
});
