import React, { Component } from 'react'
import { Table, Pagination, Button, Popconfirm, Input, Icon, Select, Checkbox, Switch } from 'antd'
import './PaginationTable.css'

/* 配置参数
 *  -- props参数
 *     -- dataSource     表格数据         Array
 *     -- pageType       控制分页类型      Boolean  后端分页：true, 前端分页：false
 *     -- currentPage    当前显示的页数    Number   后端分页必须
 *     -- resizable      列动态宽度       Boolean  默认：false
 *     -- isLoading      加载提示         Boolean  默认：false
 *     -- isEditRow      是否显示编辑      Boolean  默认：false
 *     -- isAddRow       是否显示新增      Boolean  默认：false
 *     -- isDeleteRow    是否显示删除      Boolean  默认：false
 *     -- isSelectColumns 是否显示筛选字段  Boolean   默认: false   
 * 
 *  -- 继承
 *     -- configTable   配置表格
 *        configTable() {
 *          return {表格配置参数}
 *        }
 *     -- renderColumns 配置表格列
 *        renderColumns() {
 *          return [{column_1}, ...]
 *        }
 *     -- onRowClick(record, index) 点击行事件
 *        -- record 当前行数据
 *        -- index  当前行索引
 *     -- onChange 分页/排序/过滤变化时触发
 *     -- editDone(changeFields, currentRow, dataSource) 编辑/保存当前行数据
 *        -- changeFields 修改的字段      例：{field1: 'B', ...}
 *        -- currentRow   编辑的当前行    例：{field1: 'A', field2: ...}
 *        -- dataSource   当前数据源      例：[{}, ...]
 *     -- deleteRow(currentRow, dataSource, index) 删除当前行数据
 *        -- currentRow   编辑的当前行    例：{field1: 'A', field2: ...}
 *        -- dataSource   当前数据源      例：[{}, ...]
 *        -- index        当前行索引
 */

class PaginationTable extends Component {
  state = {
    loading: false,
    pageSize: 10,
    jumper: '',
    sorter: {},
    node: undefined,
    drag: false,
    oldX: 0,
    oldWidth: 0,
    dataSource: this.props.dataSource,
    editable: {},
    filterFields: this.props_columns_keys
  }

  editCache = {}

  componentWillMount() {
    this.config = this.configTable()
    this.columns = this.renderColumns()
    this.columns = this.getComponentColumns()
    this.setState({ filterFields: this.props_columns_keys })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
  }

  getComponentColumns() {
    const { isEditRow, isDeleteRow } = this.props
    const self = this
    this.columns = this.columns.map((value, idx) => {
      const data = {
        ...value,
        render(text, record, idx) {
          text = typeof value.formatter === 'function' ? value.formatter(text) : text
          return (
            <div>
              {
                self.state.editable[idx] ?
                  <Input type="text"
                    defaultValue={text}
                    onChange={(e) => self.handleEdit(idx, value.key, e.target.value)} />
                  :
                  <span>{text}</span>
              }
            </div>
          )
        }
      }
      return data
    })

    if ((!isEditRow && !isDeleteRow)) return this.columns
    this.columns = [
      ...this.columns,
      {
        title: '操作',
        dataIndex: 'operations',
        key: 'operations',
        render(text, record, index) {
          return (
            <div className="operation-group">
              {
                isEditRow ?
                  self.state.editable[index] ?
                    <span>
                      <span style={{ marginLeft: 10 }}
                        onClick={() => self.changeEditState('save', index)}>
                        <Button icon="save">保存</Button>
                      </span>
                      <span style={{ marginLeft: 10 }}
                        onClick={() => self.changeEditState('cancel', index)}>
                        <Button type="danger" icon="close">取消</Button>
                      </span>
                    </span>
                    :
                    <span style={{ marginLeft: 10 }}
                      onClick={() => self.changeEditState('edit', index)}>
                      <Button icon="edit">编辑</Button>
                    </span>
                  : ''
              }
              {
                isDeleteRow ?
                  <span style={{ marginLeft: 10 }}>
                    <Popconfirm
                      title="确定删除"
                      onConfirm={() => self.changeEditState('delete', index)}>
                      <Button type="danger" icon="delete">删除</Button>
                    </Popconfirm>
                  </span>
                  : ''
              }
            </div>
          )
        },
      }
    ]
    return this.columns
  }

  changeEditState(type, index) {
    switch (type) {
      case 'edit':
        this.setState({
          editable: { ...this.state.editable, [index]: true }
        })
        break
      case 'save':
        console.log(index)
        if (this.editCache[index]) {
          let dataSource = [...this.state.dataSource]
          const currentRow = dataSource[index]
          const cacheData = this.editCache[index]
          let changeFields = {}
          for (let key in cacheData) {
            if (currentRow[key] !== cacheData[key]) {
              changeFields = {
                ...changeFields,
                [key]: cacheData[key]
              }
            }
          }
          const frontEndCurPage = this.state.pagination ? (this.state.pagination.current - 1) : 0
          const mergeIndex = frontEndCurPage * 10 + index
          dataSource[mergeIndex] = this.editCache[index]
          this.editDone(changeFields, currentRow, dataSource)
          this.setState({
            editable: { ...this.state.editable, [index]: false },
            dataSource
          })
        } else {
          this.setState({
            editable: { ...this.state.editable, [index]: false },
          })
        }
        break
      case 'cancel':
        this.editCache[index] = undefined
        this.setState({
          editable: { ...this.state.editable, [index]: false }
        })
        break
      case 'delete':
        const dataSource = [...this.state.dataSource]
        const currentRow = dataSource[index]
        const frontEndCurPage = this.state.pagination ? (this.state.pagination.current - 1) : 0
        const mergeIndex = frontEndCurPage * 10 + index
        this.deleteRow(currentRow, dataSource, mergeIndex)
        this.setState({
          editable: { ...this.state.editable, [index]: false },
          dataSource
        }, () => this.editCache = {})
        break
      default:
        break
    }
  }

  handleEdit(index, key, value) {
    if (!this.editCache[index]) {
      this.editCache[index] = { ...this.state.dataSource[index] }
    }
    this.editCache[index][key] = value
  }

  render() {
    const { pageType = true } = this.props
    const { dataSource, filterFields } = this.state

    //分页设置
    const pagination = Object.assign({
      showSizeChanger: true,
      showQuickJumper: !pageType,
      defaultCurrent: 1,
      defaultPageSize: this.state.pageSize,
      showTotal: this.showTotal,
      total: (pageType ? this.props.dataLength : this.state.dataSource.length),
      onChange: this.onPageChange,
      onShowSizeChange: this.onPageChangeCb,
    }, (pageType ? { current: this.props.currentPage } : {}))

    this.columns = this.columns.map((col, index) => {
      if (col.sorter) {
        col.title = typeof col.title === 'string'
          ? (
            <span>
              <span style={{ cursor: 'pointer' }} onClick={this.changeOrder(col.key)}>
                {col.title}
              </span>
              {
                this.props.resizable ?
                  <span
                    className="active-column"
                    onMouseDown={(e) => this.handleMouseDown(e, index)}
                    onMouseUp={(e) => this.handleMouseUp(e, index)}
                    onMouseMove={(e) => this.handleMouseMove(e, index)}>
                  </span> : ''
              }
            </span>)
          : col.title
        col.sortOrder = this.state.sorter.columnKey === col.key
          ? this.state.sorter.order : false
      }
      return col
    })

    const render_columns = this.props.isSelectColumns ?
      this.columns.reduce((prev, value, index) => {
        if (filterFields.includes(value.key)) {
          prev.push(value)
        }
        return prev
      }, [])
      : this.columns
    return (
      <div className="antd-inline-table row-highLight clearfix">
        {!!this.props.isSelectColumns ?
          <SelectColumns
            columns={this.columns}
            getColumns={this.getColumns.bind(this)} /> : ''}
        {
          this.props.isAddRow ?
            <Button
              className="editable-add-btn"
              style={{ marginBottom: '5px' }}
              icon="plus" type="primary"
              onClick={() => this.addRowBefore()}>
              添加
          </Button> : ""
        }
        <Table
          pagination={pageType ? false : pagination}
          dataSource={dataSource}
          columns={render_columns}
          onChange={this.fetchData.bind(this)}
          onRowClick={this.onRowClick}
          loading={this.props.isLoading}
          {...this.config} />
        {
          pageType ?
            <div>
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
            </div> : ''
        }
      </div>
    )
  }
  getColumns(keys) {
    this.setState({ filterFields: keys })
  }
  //配置表格
  configTable() {
    return {}
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
    return []
  }
  //显示条数
  showTotal(total, range) {
    return `当前 ${range[0]} - ${range[1]} 条  总共${total}条`
  }
  //跳转页数改变
  onJumperChange = (e) => {
    const { dataLength } = this.props
    const { pageSize } = this.state
    let jumper = Number(e.target.value.trim())
    const max = Math.ceil(dataLength / pageSize)

    if (isNaN(jumper) || jumper === 0) {
      jumper = ''
    } else if (jumper >= max) {
      jumper = max
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
    this.setState({ pageSize, editable: {} }, () => {
      this.onChange({ current: page, pageSize }, {}, {})
    })
  }
  //PageSize变化回调
  onPageChangeCb = (current, pageSize) => {
    this.setState({ pageSize, editable: {} }, () => {
      this.onChange({ current: current, pageSize }, {}, {})
    })
  }
  //表格分页、排序、筛选变化
  fetchData(pagination, filters, sorter) {
    this.setState({ pagination, filters, sorter, editable: {} }, () => {
      this.onChange(pagination, filters, !sorter.order ? {} : sorter)
    })
  }

  onChange(pagination, filters, sorter) {
    // console.log(pagination, filters, sorter)
  }
  //点击行
  onRowClick(record, index) {
    // console.log(record, index)
  }
  // 动态列宽度
  // 动态列宽度--鼠标按下
  handleMouseDown(e, index) {
    e.preventDefault()
    const node = ((e.target.parentNode).parentNode).parentNode
    const offsetWidth = node.offsetWidth
    this.setState({ node: node })
    if (e.pageX > offsetWidth) {
      this.setState({
        drag: true,
        oldX: e.pageX,
        oldWidth: offsetWidth
      })
    }
  }
  // 动态列宽度--鼠标弹出
  handleMouseUp(e) {
    e.preventDefault()
    this.setState({
      node: undefined,
      drag: false,
      oldX: 0,
      oldWidth: 0,
    })
  }
  // 动态列宽度--鼠标移动
  handleMouseMove = (e, index) => {
    e.preventDefault()
    const { oldX, oldWidth, drag, node } = this.state
    if (drag != null && drag === true) {
      if (oldWidth + (e.pageX - oldX) > 0) {
        node.width = oldWidth + (e.pageX - oldX)
      }
    }
  }
  //保存编辑
  editDone(changeFields, currentRow, dataSource) {
  }
  // 删除行
  deleteRow(currentRow, dataSource, index) {
  }
  //添加行
  addRowBefore() {
    const dataSource = [...this.state.dataSource]
    const frontEndCurPage = this.state.pagination ? (this.state.pagination.current - 1) : 0
    const mergeIndex = frontEndCurPage * 10
    this.addRow(dataSource, mergeIndex)
    this.setState({ dataSource }, () => this.editCache = {})
  }

  addRow(dataSource, curPageFirstRow) {
    dataSource.splice(curPageFirstRow, 0, {})
  }

  get props_columns_keys() {
    return (this.columns && this.props.isSelectColumns) && this.columns.reduce((prev, value, index) => {
      prev.push(value.key)
      return prev
    }, [])
  }
}

class SelectColumns extends Component {
  state = {
    checkedList: this.props_columns_keys,
    indeterminate: true,
    checkAll: true,
    toggleSelect: false,
    settings: {}
  }

  componentWillMount() {
    this.setState({ settings: this.setSelectorColumns(this.props_columns) })
  }

  setSelectorColumns(columns) {
    return {
      render_columns: !!columns.length && columns.map((value, index) =>
        <div key={index} className="ant-select-field">
          <Checkbox value={value.key}>{value.title}</Checkbox>
        </div>
      )
    }
  }

  render() {
    const { settings } = this.state
    const toggleSelectFieldsBox = this.state.toggleSelect ? 'block' : 'none'
    return (
      <div className="ant-select-container clearfix">
        <Switch
          className="ant-select-btn"
          onChange={this.toggle.bind(this)}
          checkedChildren="开"
          unCheckedChildren="关" />
        <div className="ant-select-fields-box" style={{ display: toggleSelectFieldsBox }}>
          <div className="ant-select-fields-header">
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.selectorAll.bind(this)}
              checked={this.state.checkAll} />
            <span>{this.state.checkedList.length}/{this.props_columns_keys.length}</span>
            <Input
              style={{ width: 'calc(100% - 60px)' }}
              placeholder="搜索字段"
              onChange={this.onSearch.bind(this)}
              size='default' />
          </div>
          <Checkbox.Group
            className="ant-select-fields-body"
            value={this.state.checkedList}
            onChange={(keys) => {
              this.changeCheck(keys)
              this.props.getColumns(keys)
            }}>
            {settings.render_columns}
          </Checkbox.Group>
        </div>
      </div>
    )
  }
  // 按钮切换
  toggle(checked) {
    this.setState({ toggleSelect: !!checked })
  }
  // 搜索字段
  onSearch(event) {
    const regex = new RegExp(event.target.value, 'g')
    const selectResult = this.props_columns.filter(field => {
      const title = typeof field.title === 'object' ?
        field.title.props.children[0].props.children
        : field.title
      const status = !!regex.test(title)
      return true === status
    })
    console.log(selectResult, 'selectResult')
    const _columns = selectResult.reduce((prev, value, index) => {
      prev.push(value)
      return prev
    }, [])
    _columns.length === 0 ?
      this.setState({ settings: this.setSelectorColumns(this.props_columns) })
      :
      this.setState({ settings: this.setSelectorColumns(_columns) })
  }
  // 全选/全取消
  selectorAll(event) {
    this.setState({
      checkedList: event.target.checked ? this.props_columns_keys : [],
      indeterminate: false,
      checkAll: event.target.checked,
    }, () => {
      event.target.checked || this.props.getColumns(this.state.checkedList);
      event.target.checked && this.props.getColumns(this.state.checkedList);
    })
  }
  // 单个状态改变
  changeCheck = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props_columns_keys.length),
      checkAll: checkedList.length === this.props_columns_keys.length,
    });
  }

  get props_columns() {
    return this.props.columns
  }

  get props_columns_keys() {
    return this.props.columns.reduce((prev, value, index) => {
      prev.push(value.key)
      return prev
    }, [])
  }
}

export default PaginationTable