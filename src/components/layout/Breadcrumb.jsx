import React from 'react'
import { Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

/**
 * 面包屑导航
 */
const BreadcrumbBlock = ({ ...props }) => {
  const { breadcrumbs } = props
  return (
    <Breadcrumb {...props}>
      {
        breadcrumbs.map( (item, idx, array) => {
          // 无链接面包屑项或者当前面包屑项，不使用 Link 标签
          if (idx === array.length - 1 || !item.path) {
            return (
              <Breadcrumb.Item key={idx}>
                {idx === 0 ? <Icon type={item.icon} /> : ''} {item.text}
              </Breadcrumb.Item>
            )
          } else {
            // 第一个面包屑项显示图标
            return (
              <Breadcrumb.Item key={idx}>
                <Link to={item.path}>
                  {idx === 0 ? <Icon type={item.icon} /> : ''} {item.text}
                </Link>
              </Breadcrumb.Item>
            )
          }
        })
      }
    </Breadcrumb>
  )
}

export default BreadcrumbBlock
