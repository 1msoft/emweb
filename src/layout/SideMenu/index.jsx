import React, { useState } from 'react';
import { Icon } from 'antd';
import { SideMenu } from '@1msoft/kant-ui';

import './index.less';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  const dataSource = [
    { key: '123', title: '菜单1', url: '/abc', icon: 'delete', className: 'abccccc',
      child: [{ key: '7895', title: '菜单63', url: '/abcdhds' }]
    },
    { key: '798', title: '菜单4', url: '/abcde', icon: 'delete' },
    { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
      child: [{ key: '3456', title: '菜单62', url: '/abcdh' }]
    },
    { key: '789', title: '菜单5', url: '/abcde', icon: 'delete' },
    { key: '978', title: '菜单6', url: '/abcde', icon: 'delete' }
  ];

  const headDom = () => {
    return (
      <div className="kant-menu-head">
        <span className="kant-head-icon"
          onClick={ () => { setCollapsed(!collapsed); } }
        >
          <Icon type="swap"></Icon>
        </span>
      </div>
    );
  };

  return (
    <SideMenu
      dataSource={dataSource}
      header={headDom()}
      siderProps={{
        theme: 'light',
      }}
      useCollapsed={true}
      isCollapsed={collapsed}
      inlineOpenStyle="normal"
    />
  );
};
