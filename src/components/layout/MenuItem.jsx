import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import MenuItemText from './MenuItemText'

// 导航菜单项
const MenuItem = ({ key, routeName, path, icon, text, size })=>{
  if (path) {
    return (
      <Menu.Item key={key}>
        <Link to={path}>
          <MenuItemText icon={icon} text={text} size={size} />
        </Link>
      </Menu.Item>
    )
  } else {
    return(
      <Menu.Item key={key}>
        <MenuItemText icon={icon} text={text} size={size} />
      </Menu.Item>
    )
  }
}

export default MenuItem