import React from 'react'
import { Icon, Button, Input, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'

const Search = Input.Search;
/**
 * 普通按钮
 */
const GeneralButton = ({ type, icon, text, onClick }) => {
  return (
    <Button type={type} icon={icon} onClick={onClick}>{text}</Button>
  )
}

/**
 * 链接按钮
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
 */
const ActionButton = (props) => {
  if (props.path)
    return LinkButton(props)
  else if (props.title)
    return PopconfirmButton(props)
  else
    return GeneralButton(props)
}

/*
* 渲染列
*/
export const Column = (title, dataIndex, sorter = false, filter = false, options) => {
    return Object.assign({title, dataIndex, key: dataIndex, sorter}, options)
}

/**
 * 跳转链接列
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
 */
export const ActionColumn = (...params) => (actions) => {
  const col = Column(...params)
  col.render = (text, record, index) => (
    <div>
      {
        actions.map( (act) => {
          const props = Object.assign({ text, record, index }, act)
          return ActionButton(props)
        })
      }
    </div>
  )
  
  return col
}
