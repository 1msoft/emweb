import React from 'react'
import { Icon } from 'antd'

// 导航菜单项文字
const MenuItemText = ({ icon, text, size }) => {
  let style
  switch (size) {
    case 'small':
      style = { fontSize: 12 }
      break
    case 'middle':
      style = { fontSize: 16 }
      break
    default:
      style = {}
  }

  return (
    <span>{ icon ? <Icon type={icon} style={style} /> : ''}{text}</span>
  )
}

export default MenuItemText