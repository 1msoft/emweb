import React from 'react'
import { Menu } from 'antd'

import MenuItem from './MenuItem'
import MenuItemText from './MenuItemText'

// 头部导航
const TopNavMenu = ({ navList, openKeys, selectedKeys }) => {
  return(
    <div style={{ fontSize:'14px', border:0, float: 'right'}}>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={selectedKeys}
        style={{ lineHeight: '80px', float:'right'}}>
        {
          navList.map( (item, idx) => {
            item.key = item.routeName
            item.size = 'middle'

            if (!item.children) {
              return MenuItem(item)
            } else {
              return (
                <Menu.SubMenu key={item.routeName} title={MenuItemText(item)}>
                  {
                    item.children.map( (child, i) => {
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

export default TopNavMenu
