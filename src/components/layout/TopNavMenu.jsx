import React from 'react'
import { Menu } from 'antd'

import MenuItem from './MenuItem'

// 头部导航
const TopNavMenu = ({ navList, openKeys, selectedKeys }) => {
  return(
    <div style={{ fontSize:'14px', border:0, float: 'right'}}>
      <Menu
        theme="ligth"
        mode="horizontal"
        selectedKeys={selectedKeys}
        style={{ lineHeight: '80px', float:'right'}}>
        {
          navList.map( (item, idx) => {
            item.key = item.routeName
            return MenuItem(item)
          })
        }
      </Menu>
    </div>
  )
}

export default TopNavMenu