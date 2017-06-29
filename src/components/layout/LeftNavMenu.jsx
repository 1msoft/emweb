import React from 'react'
import { Layout, Menu } from 'antd'

import MenuItem from './MenuItem'
import MenuItemText from './MenuItemText'


// 左边导航
const LeftNavMenu = ({ navList, openKeys, selectedKeys }) => {
  return (
    <Layout.Sider width={200}>
      <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          style={{ minHeight:700 }} >
          {
            navList.map( (item, idx) => {
              item.key = item.routeName
              item.size = 'middle'
              if(!item.children) {
                return MenuItem(item)
              } else {
                return (
                  <Menu.SubMenu key={item.routeName} title={MenuItemText(item)} onTitleClick={() => {
                    const idx = openKeys.indexOf(item.routeName)

                    if (idx >= 0) {
                      openKeys.splice(idx, 1)
                    } else {
                      openKeys.push(item.routeName)
                    }
                  }}>
                    {
                      item.children.map( (child, i)=> {
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
    </Layout.Sider>
  )
}

export default LeftNavMenu
