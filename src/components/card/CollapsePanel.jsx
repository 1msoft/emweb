import React, { Component } from 'react'
import { Collapse } from 'antd'

/**
 * 折叠面板，可展开、收缩，支持标题自定义
 * 配置参数：
 * --header 标题
 * 使用方法：
 * <CollapsePanel header='header'>
 *   <Table />
 * </CollapsePanel>
 */
const customPanelStyle = {
  background: '#F7F7F7',
  borderRadius: '4px',
  marginButton: '20px',
  border: 0
}

const Panel = Collapse.Panel

export default class CollapsePanel extends Component {

  render() {
    const { header, children } = this.props
    return (
      <div>
        <Collapse accordion className="antd-collapse-item-costom">
          <Panel header={header} key="1" style={customPanelStyle}>
            {
              children ? React.Children.map(this.props.children, (child, index) => {
                return (
                  <div key={index}>{child}</div>
                )
              }) : ''
            }
         </Panel>
        </Collapse>       
      </div>
    )
  }
}