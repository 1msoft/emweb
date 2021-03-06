import React from 'react';

import {
  Icon,
  Menu,
  Avatar,
  Dropdown,
} from 'antd';

import { withRouter } from 'react-router-dom';

import avatar from '../../assets/images/avatar.png';
import './UserCenter.less';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

/**
 * 个人资料
 */
const MenuComponent = (props) => {
  const onClick = ({ key }) => {};

  const menus = [
    {
      key: 'personalData',
      icon: 'iconyonghu-geren',
      text: '个人资料',
      className: 'personal-data',
    },
    {
      key: 'changePassword',
      icon: 'iconyonghu-xiugaimima',
      text: '修改密码',
      className: 'change-password',
    },
    {
      key: 'setting',
      icon: 'iconyonghu-shezhi',
      text: '设置',
      className: 'setting',
    },
    {
      key: 'divider',
    },
    {
      key: 'helpCenter',
      icon: 'iconyonghu-bangzhu',
      text: '帮助中心',
      className: 'help-center',
    },
    {
      key: 'feedBack',
      icon: 'iconyonghu-yijian',
      text: '意见反馈',
      className: 'feed-back',
    },
    {
      key: 'divider',
    },
    {
      key: 'logout',
      icon: 'iconyonghu-tuichu',
      text: '退出登录',
      className: 'logout',
      onChange: () => { props.history.push('/login-register'); }
    },
  ];
  return (
    <Menu onClick={onClick} className="menu">
      {menus.map((menu, index) => {
        if (menu.key === 'divider') {
          return <MenuDivider className="menu-divider" key={index}/>;
        }
        return (
          <MenuItem className={`${menu.className} menu-item`} key={menu.key}
            onClick={() => { menu.onChange ? menu.onChange() : null; } }
          >
            <i className={`menu-item-icon iconfont ${menu.icon}`} />
            {menu.text}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

let DropDown =  (props) => {
  return (
    <Dropdown
      className="dropdown"
      overlay={<MenuComponent {...props} />}
      overlayClassName="overlay-container"
      getPopupContainer={() => document.querySelector('.user-drop-down')}
    >
      <span className="user-drop-down">
        <Avatar
          icon="user"
          src={avatar}
          className="user-img"
        />
        <span className="user-name">Hi, Jeffery</span>
        <Icon
          type="right"
          className="icon-allow"
        />
      </span>
    </Dropdown>
  );
};

DropDown = withRouter(DropDown);

export default DropDown;
