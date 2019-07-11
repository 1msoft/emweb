import React from 'react';

import {
  Icon,
  Menu,
  Avatar,
  Dropdown,
} from 'antd';

import avatar from '../../assets/images/avatar.png';
import './UserCenter.less';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

/**
 * 个人资料
 */
const MenuComponent = () => {
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
    },
  ];
  return (
    <Menu onClick={onClick} className="menu">
      {menus.map((menu, index) => {
        if (menu.key === 'divider') {
          return <MenuDivider className="menu-divider" key={index}/>;
        }
        return (
          <MenuItem className={`${menu.className} menu-item`} key={menu.key}>
            <i className={`iconfont ${menu.icon} menu-item-icon`}></i>
            {menu.text}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default () => {
  return (
    <Dropdown
      visible={true}
      className="dropdown"
      overlay={<MenuComponent/>}
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
