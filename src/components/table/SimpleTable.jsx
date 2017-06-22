import React, { Component } from 'react'
import { Table } from 'antd'

/**
 * 表格 用于显示简单信息，只读不可编辑，无分页功能，如化疗信息、检查信息、基因检测信息...
 * 使用方式:
 * class SimpleTables extends Simple {
 *    renderColumns(){
 *        return renderColumn数组
 *    }
 * }
 * renderColumns为传进来的参数
 */
export default class SimpleTable extends Component {
  state = {
    loading: false
  }

  columns = this.renderColumns()
  onRowClick = this.onRowClick()

  render() {
    return (
      <div className="inline-table">
          <div className="table-style">
        <Table
          pagination={false}
          loading={this.state.loading}
          size="small"
          bordered
          columns={this.columns}
          onRowClick={this.onRowClick}
          dataSource={this.props.dataSource} />
          </div>
      </div>
    )
  }

  renderColumns() {
    return []
  }

  onRowClick(record, index) {
  }
}