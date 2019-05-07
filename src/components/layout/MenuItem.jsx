import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { private as routes } from '../../config/routes';
import MenuItemText from './MenuItemText'

/**
 * 对 path 进行处理
 * @param {String} path router path
 */
const handlerPath = (path) => {
  let defaultParams = '';
  for(let key in routes){
    if( routes[key].defaultParams && routes[key].path === path ){
      defaultParams = routes[key].defaultParams;
      break;
    }
  }
  if(!defaultParams){return path;}
  for(let key in defaultParams){
    const patt =new RegExp(`:${key}`);
    path = path.replace(patt, defaultParams[key]);
  }
  return path;
}

// 导航菜单项
const MenuItem = ({
  key,
  path,
  icon,
  text,
  size,
  extra,
  state,
  routeName,
  textWidth,
  defaultParams
}) => {
  if (path) {
    path = handlerPath(path);
    return (
      <Menu.Item key={key} className="layout-sider-nav-link">
        <Link to={{ pathname: path, state }} style={{ height: '100%' }}>
          <MenuItemText icon={icon} text={text} textWidth={textWidth}
            size={size} extra={extra} />
        </Link>
      </Menu.Item>
    )
  } else {
    return (
      <Menu.Item key={key} className="layout-sider-nav-link">
        <MenuItemText icon={icon} text={text} textWidth={textWidth}
          size={size} extra={extra} />
      </Menu.Item>
    )
  }
}

export default MenuItem
