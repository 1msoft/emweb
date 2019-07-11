import React, { useState } from 'react';

import { SideMenu } from '@1msoft/kant-ui';
import { getCookie, setCookie } from '@utils/helper.js';
import './index.less';

export default (props) => {
  const [sideMenuStatus, setSideMenuStatus] = useState(
    getCookie('menu_status')
  );
  return (
    <SideMenu
      useCollapsed={true}
      selectedKeys={props.selectKeys}
      openKeys={props.openKeys}
      dataSource={props.dataSource}
      isCollapsed={{ isOpen: JSON.parse(sideMenuStatus) }}
      inlineOpenStyle="normal"
      onJumpway={(url) => { props.history.push(url); }}
      siderProps={{ theme: 'light' }}
      onSiderCollapse={(val) => { setCookie('menu_status', val); }}
    />
  );
};
