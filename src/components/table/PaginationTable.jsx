import React, { Component } from 'react'
import { Table, Pagination } from 'antd'

class PaginationTable extends Component {
  state = {
    loading: false,
    pageSize: 10,
    jumper: '',
    sorter: {},
  }

  columns = this.renderColumns()

  config = this.configTable()

  render() {
    //分页设置
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

    this.columns = this.columns.map( (col) => {
      if (col.sorter) {
        col.title = typeof col.title === 'string'
          ? (<span style={{ cursor: 'pointer' }} onClick={this.changeOrder(col.key)}>{col.title}</span>)
          : col.title
        col.sortOrder = this.state.sorter.columnKey === col.key
          ? this.state.sorter.order : false
      }
      return col
    })
    
    return (
      <div className="inline-table clearfix highLight">
        <Table
          loading={this.state.loading}
          pagination={false}
          dataSource={this.props.dataSource}
          columns={this.columns}
          onChange={this.fetchData.bind(this)}
          onRowClick={this.onRowClick}
          {...this.config} />
        {/*<ul
          style={{ clear: 'none', padding: '12px 0' }}
          className="ant-pagination">
          <div className="ant-pagination-options">
            <div className="ant-pagination-options-quick-jumper">
              跳至<input type="text" value={this.state.jumper} onChange={this.onJumperChange} onKeyDown={this.onJumpToPage} />页
            </div>
          </div>
        </ul>*/}
        <Pagination ref='pagination' style={{ clear: 'none', paddingRight: 0 }} {...pagination} />
      </div>
    )
  }
  //配置表格
  configTable() {
    return {};
  }

  changeOrder = (key) => (e) => {
    let revert = ['descend', 'ascend', false]
    let sorter
    if (this.state.sorter.columnKey !== key) {
      sorter = { columnKey: key, order: revert[0] }
    } else {
      const idx = revert.indexOf(this.state.sorter.order)
      const nextIdx = idx === revert.length - 1 ? 0 : idx + 1
      sorter = { columnKey: key, order: revert[nextIdx] }
    }

    this.setState({ sorter }, () => {
      this.fetchData({ current: 1, pageSize: this.state.pageSize }, {}, this.state.sorter)
    })
  }

  //配置列
  renderColumns() {
    return [];
  }
  //显示条数
  showTotal(total, range) {
    return `当前 ${range[0]} - ${range[1]} 条`
    // return `当前 ${range[0]} - ${range[1]} 条  总共${total}条`
  }
  //跳转页数改变
  onJumperChange = (e) => {
    let jumper = Number( e.target.value.trim() )

    if ( isNaN(jumper) || jumper === 0) {
      jumper = ''
    } else if (jumper < 0) {
      jumper = 1
    }

    this.setState({ jumper })
  }
  //跳转到对应页
  onJumpToPage = (e) => {
    if (e.keyCode === 13 && this.state.jumper) {
      this.onChange({ current: this.state.jumper, pageSize: this.state.pageSize }, {}, {})
    }
  }
  //页码改变
  onPageChange = (page, pageSize) => {
    this.setState({ pageSize }, () => {
      this.onChange({ current: page, pageSize }, {}, {})
    })
  }
  //PageSize变化回调
  onPageChangeCb = (current, pageSize) => {
    this.setState({ pageSize }, () => {
      this.onChange({ current: current, pageSize }, {}, {})
    })
  }
  //表格分页、排序、筛选变化
  fetchData(pagination, filters, sorter) {
    this.setState({ pagination, filters, sorter }, () => {
      this.onChange(pagination, filters, !sorter.order ? {} : sorter)
    })
  }

  onChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter)
  }
  //点击行
  onRowClick(record, index) {
    console.log(record, index)
  }
}

export default PaginationTable