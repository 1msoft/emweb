import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

export default class TableBlock extends Component {
  state = {
    loading: false,
    pageSize: 10,
    jumper: '',
  }

  columns = this.renderColumns()

  render() {
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: false,
      defaultCurrent: 1,
      defaultPageSize: this.state.pageSize,
      showTotal: this.showTotal,
      total: this.props.dataLength,
      current: this.props.currentPage,
      onChange: this.onPageChange,
      onShowSizeChange: this.onPageChangeCb,
    }

    return (
      <div className="block-table">
        <Table
          pagination={false}
          loading={this.state.loading}
          size="middle"
          bordered
          columns={this.columns}
          dataSource={this.props.dataSource}
          onChange={this.onChange.bind(this)} />
        <ul
          style={{ clear: 'none', padding: '12px 0' }}
          className="ant-pagination">
          <div className="ant-pagination-options">
            <div className="ant-pagination-options-quick-jumper">
              跳至<input type="text" value={this.state.jumper} onChange={this.onJumperChange} onKeyDown={this.onJumpToPage} />页
            </div>
          </div>
        </ul>
        <Pagination ref='pagination' style={{ clear: 'none', paddingRight: 0 }} {...pagination} />
      </div>
    );
  }

  showTotal(total, range) {
    return `当前 ${range[0]} - ${range[1]} 条`
  }

  renderColumns() {
    return [];
  }

  onJumperChange = (e) => {
    let jumper = Number( e.target.value.trim() )

    if ( isNaN(jumper) || jumper === 0) {
      jumper = ''
    } else if (jumper < 0) {
      jumper = 1
    }

    this.setState({ jumper })
  }

  onJumpToPage = (e) => {
    if (e.keyCode === 13 && this.state.jumper) {
      this.onChange({ current: this.state.jumper, pageSize: this.state.pageSize }, {}, {})
    }
  }

  onPageChange = (page, pageSize) => {
    this.setState({ pageSize })
    this.onChange({ current: page, pageSize }, {}, {})
  }

  onPageChangeCb = (current, pageSize) => {
    this.setState({ pageSize })
    this.onChange({ current: current, pageSize }, {}, {})
  }

  onChange(page, filters, orders) {
    console.log(page, filters, orders)
  }
}