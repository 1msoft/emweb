import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

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
      status: 'unread',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
    {
      toPath: '/home',
      status: 'unread',
      description: '您有新的消息注意查收 ...',
      date: '05/07',
    },
    {
      toPath: '/404',
      status: 'read',
      description: '新的消息收到请回复',
      date: '05/07',
    },
    {
      toPath: '/home',
      status: 'read',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
    {
      toPath: '/',
      status: 'read',
      description: '您有新的消息，请注意查收',
      date: '05/07',
    },
  ];

  const setMarkRead = () => {};
  const getMoreInfomation = () => {};
  const STATUS_BADGE = {
    unread: 'error',
    read: 'default',
  };
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
                className="notification-menu-item clearfix"
              >
                <Badge status={STATUS_BADGE[notification.status]} />
                <span className={
                  classNames(
                    'notification-description',
                    { 'notification-read': notification.status === 'read' }
                  )
                }>{notification.description}</span>
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
                className="notification-menu-item clearfix"
              >
                <Badge status={STATUS_BADGE[notification.status]} />
                <span className={
                  classNames(
                    'notification-description',
                    { 'notification-read': notification.status === 'read' }
                  )
                }>{notification.description}</span>
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
  const [message, useMessage] = useState(false);

  useEffect(() => {
    const tiemr = setTimeout(() => {
      useMessage(true);
    }, 2000);
    return () => clearTimeout(tiemr);
  });

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
            offset={[-8, 4]}
            className="icon-wrapper"
          >
            <i className="mail-icon iconfont iconMail-xiaoxi" />
          </Badge>
        </span>
      </span>
    </Dropdown>
  );
};
