import React from 'react'
import { Layout, Menu } from 'antd'

import MenuItem from './MenuItem'
import MenuItemText from './MenuItemText'

// 左边导航
const LeftNavMenu = ({ navList = [], openKeys, selectedKeys }) => {
  return (
    <div>
      <div className="layout-sider-logo">英迈软件</div>
      <Menu
        mode="inline"
        theme='dark'
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        className="layout-sider-nav">
        {
          navList.map((item, idx) => {
            item.key = item.routeName
            item.size = 'middle'
            if (!item.visChildren) {
              return MenuItem(item)
            } else {
              return (
                <Menu.SubMenu
                  key={item.routeName}
                  title={MenuItemText(item)}
                  onTitleClick={() => {
                    const idx = openKeys.indexOf(item.routeName)

                    if (idx >= 0) {
                      openKeys.splice(idx, 1)
                    } else {
                      openKeys.push(item.routeName)
                    }
                  }}>
                  {
                    item.visChildren.map((child, i) => {
                      child.key = child.routeName
                      child.size = 'small'
                      return MenuItem(child)
                    })
                  }
                </Menu.SubMenu>
              )
            }
          })
        }
      </Menu>
    </div>
  )
}

export default LeftNavMenu
