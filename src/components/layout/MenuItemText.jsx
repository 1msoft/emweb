import React from 'react'
import { Icon } from 'antd'

// 导航菜单项文字
const MenuItemText = ({ icon, text, textWidth, size, extra }) => {
  // let sizeStyle
  // switch (size) {
  //   case 'small':
  //     sizeStyle = { fontSize: 12 }
  //     break
  //   case 'middle':
  //     sizeStyle = { fontSize: 16 }
  //     break
  //   default:
  //     sizeStyle = {}
  // }

  if (icon) {
    if (typeof icon === 'string') {
      // const imgUrl = require(`../../assets/images/${icon}.png`);
      // icon = <img src={imgUrl} alt="" className="layout-sider-nav-link-conten-icon"/>
      icon = < Icon type={icon} className="layout-sider-nav-link-conten-icon"/>
    }
  }

  let fullText = text || ''
  let textContent = fullText
  if (textWidth) {
    const wrapText = fullText.substr(0, textWidth)
    textContent = fullText.length <= textWidth
      ? fullText : `${wrapText}...`
  }

  return (
    <div className="layout-sider-nav-link-content">
      { icon }
      {/* <Tooltip title={ fullText }> */}
      <span className="layout-sider-nav-link-content-text">{ textContent }</span>
      {/* </Tooltip> */}
      { extra ? extra : '' }
    </div>
  )
}

export default MenuItemText
