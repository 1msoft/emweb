import React, { Component } from 'react'
import { Table } from 'antd'

/**
 * 简单表格-不分页
 *
 * @class SimpleTable
 * @extends {Component}
 */
class SimpleTable extends Component {
  state = {
    loading: false
  }

  columns = this.renderColumns()

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
            onRowClick={this.onRowClick()}
            dataSource={this.props.dataSource}
            {...this.configTable()} />
        </div>
      </div>
    )
  }

  /**
   * 配置表格
   *
   * @returns
   * @memberof SimpleTable
   */
  configTable() {
    return {}
  }

  /**
   * 列定义
   *
   * @returns {Array}
   * @memberof SimpleTable
   */
  renderColumns() {
    return []
  }

  /**
   * 点击行回调
   *
   * @param {*} record 当前行记录
   * @param {*} index  索引值
   * @memberof SimpleTable
   */
  onRowClick(record, index) {
  }
}

export default SimpleTable
