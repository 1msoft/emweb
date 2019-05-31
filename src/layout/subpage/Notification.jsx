import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Tabs,
  Icon,
  Menu,
  Badge,
  Dropdown,
} from 'antd';
import './Notification.less';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;

/**
 * 个人资料
 */
const Notification = () => {
  const [notification, useNotification] = useState(true);
  const [project, useProject] = useState(true);
  const notifications = [
    {
      toPath: '/',
      status: 'error',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
    {
      toPath: '/home',
      status: 'error',
      description: '您有新的消息注意查收 ...',
      date: '05/07',
    },
    {
      toPath: '/404',
      status: 'default',
      description: '新的消息收到请回复',
      date: '05/07',
    },
    {
      toPath: '/home',
      status: 'default',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
    {
      toPath: '/',
      status: 'default',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
  ];

  const setMarkRead = () => {};
  const getMoreInfomation = () => {};
  return (
    <Menu
      className="notification-wrapper">
      <Tabs>
        <TabPane
          key="notification"
          tab={<Badge dot={notification} offset={[6]}>通知</Badge>}
        >
          {
            notifications.map((notification, index) => (
              <Link
                key={index}
                to={notification.toPath}
                className="notification-menu-item"
              >
                <Badge status={notification.status || 'error'} />
                <span className="notification-description">{notification.description}</span>
                <span className="notification-time">{notification.date}</span>
              </Link>
            ))
          }
          <div className="action-botton">
            <div
              className="mark-read"
              onClick={setMarkRead}
            >
              <Icon type="check" />
              全部标记
            </div>
            <div
              className="more-infomation"
              onClick={getMoreInfomation}
            >
              <Icon type="message" />
              更多消息
            </div>
          </div>
        </TabPane>
        <TabPane
          key="project"
          tab={<Badge dot={project} offset={[6]}>项目</Badge>}
        >
          {
            notifications.map((notification, index) => (
              <Link
                key={index}
                to={notification.toPath}
                className="notification-menu-item"
              >
                <Badge status={notification.status || 'error'} />
                <span className="notification-description">{notification.description}</span>
                <span className="notification-time">{notification.date}</span>
              </Link>
            ))
          }
          <div className="action-botton">
            <div
              className="mark-read"
              onClick={setMarkRead}
            >
              <Icon type="check" />
              全部标记
            </div>
            <div
              className="more-infomation"
              onClick={getMoreInfomation}
            >
              <Icon type="message" />
              更多消息
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Menu>
  );
};

export default () => {
  const [message, useMessage] = useState(true);
  return (
    <Dropdown
      overlay={<Notification/>}
      overlayClassName="overlay-notification"
      getPopupContainer={() => document.querySelector('.notification-container')}
    >
      <span className="notification-container">
        <span className="mail-container">
          <Badge
            dot={message}
            className="icon-wrapper"
          >
            <Icon
              type="mail"
              className="mail-icon"
            />
          </Badge>
        </span>
      </span>
    </Dropdown>
  );
};
