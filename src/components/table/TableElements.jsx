/**
 * 表格按钮配套组件
 * @module TableElement
 */

import React from 'react'
import { Icon, Button, Input, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'

const Search = Input.Search;

/**
 * 普通按钮
 *
 * @param {Object} props                 参数
 * @param {String} props.type            类型
 * @param {String} props.icon            图标
 * @param {String} props.text            内容
 * @param {Function} props.onClick       点击调用函数
 */
const GeneralButton = ({ type, icon, text, onClick }) => {
  return (
    <Button type={type} icon={icon} onClick={onClick}>{text}</Button>
  )
}

/**
 * 链接按钮
 *
 * @param {Object} props                 参数
 * @param {String} props.type            类型
 * @param {String} props.icon            图标
 * @param {String|Function} props.path   链接地址或者方法
 * @param {Function} props.onClick       点击调用函数
 * @param {Object} props.record          当前记录
 * @param {String} props.text            内容
 */
const LinkButton = ({ type, path, text, icon, record, onClick }) => {
  let linkUrl
  if (typeof path === 'function')
    linkUrl = path(record)
  else
    linkUrl = path

  if (type === 'link')
    return (
      <Link to={linkUrl} onClick={(e) => onClick(record, e)}><Icon type={icon} /> {text}</Link>
    )
  else
    return (
      <Link to={linkUrl}>
        <Button type={type} icon={icon} onClick={(e) => onClick(record, e)}>{text}</Button>
      </Link>
    )
}

/**
 * 气泡按钮
 *
 * @param {Object} props                 参数
 * @param {String} props.type            类型
 * @param {String} props.icon            图标
 * @param {Function} props.onConfirm     确认调用函数
 * @param {Object} props.record          当前记录
 * @param {String} props.title           标题
 * @param {String} props.text            内容
 */
const PopconfirmButton = ({ type, icon, onConfirm, record, title, text }) => {
  return (
    <a>
      <Popconfirm title={title} type={type} icon={icon} onConfirm={(e) => onConfirm(record, e)}>{text}</Popconfirm>
    </a>
  )
}

/**
 * 操作按钮
 *
 * @param {*} props 参数
 */
const ActionButton = (props) => {
  if (props.path)
    return LinkButton(props)
  else if (props.title)
    return PopconfirmButton(props)
  else
    return GeneralButton(props)
}

/**
 * 渲染列
 *
 * @param {String} title      标题
 * @param {String} dataIndex  索引
 * @param {Boolean} sorter    是否排序
 * @param {*} options         扩展选项
 * @returns {Object}
 */
export const Column = (title, dataIndex, sorter = false, options) => {
  return Object.assign({ title, dataIndex, key: dataIndex, sorter }, options)
}

/**
 * 跳转链接列
 *
 * @param   {...any} params 参数
 * @returns {Document}
 */
export const LinkableColumn = (...params) => (path, text, onClick) => {
  const col = Column(...params)
  col.render = (txt, record, index) => {
    const props = Object.assign({ text: txt, record, index, type: 'link' }, { path, text, onClick })
    return LinkButton(props)
  }

  return col
}

/**
 * 操作列
 *
 * @param  {...any} params 参数
 * @returns {Document}
 */
export const ActionColumn = (...params) => (actions) => {
  const col = Column(...params)
  col.render = (text, record, index) => (
    <div>
      {
        actions.map((act) => {
          const props = Object.assign({ text, record, index }, act)
          return ActionButton(props)
        })
      }
    </div>
  )

  return col
}
