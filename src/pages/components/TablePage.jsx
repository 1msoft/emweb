import React, { Component } from 'react'
import { Input } from 'antd'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import PaginationTable from '../../components/table/PaginationTable'
import SimpleTable from '../../components/table/SimpleTable'
import { Column } from '../../components/table/TableElements'
import { sorter } from '../../utils/helper'

const student = [
  {name: '小明', age: 14, sex: '男', birthday: '2001-05-03', school: '西湖小学', grade: '小学6年级', class: '三班', studentId: 1},
  {name: '小红', age: 13, sex: '女', birthday: '2000-04-03', school: '西湖小学', grade: '小学6年级', class: '二班', studentId: 2},
  {name: '小东', age: 15, sex: '男', birthday: '2003-05-07', school: '西湖小学', grade: '小学6年级', class: '一班', studentId: 3},
  {name: '小北', age: 14, sex: '男', birthday: '1999-12-03', school: '西湖小学', grade: '小学6年级', class: '三班', studentId: 1},
  {name: '小南', age: 11, sex: '男', birthday: '2001-2-23', school: '西湖小学', grade: '小学6年级', class: '六班', studentId: 5},
  {name: '小西', age: 12, sex: '男', birthday: '2002-10-13', school: '西湖小学', grade: '小学6年级', class: '六班', studentId: 5},
]

const students = []
for(let i = 0; i<100; i++) {
  const student = {
    _id: `student_${i}`,
    name: `A${i}`,
    age: `${Math.floor(Math.random() * (12 - 9 + 1) + 9)}`,
    sex: (Math.random() * 10) > 5 ? '男' : '女',
    birthday: `2006-${Math.floor(Math.random() * (12 - 1)) + 1}-${Math.floor(Math.random() * (29 - 1) + 1)}`,
    school: '西湖小学',
    grade: '小学6年级',
    class: `${Math.floor(Math.random() * 10)}班`,
    studentId: Math.floor(Math.random() * 30)
  }
  students.push(student)
}

@inject(['sampleStore'])
@observer
class TablePage extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.sampleStore
    this.state = {
      dataSource: students
    }
  }
  

  render() {
    const { dataSource } = this.state
    return (
      <div>
        <div style={{margin: '15px'}}>
          <h3>简单表格</h3>
          <CommonTable
            dataSource={student}/>
        </div>
        <div style={{margin: '15px'}}>
          <h3>固定行/列</h3>
          <ChangeTable
            dataSource={student}/>
        </div>
        <div style={{margin: '15px'}}>
          <h3>前端操作/分页/排序/过滤</h3>
          <FrontEndTable
            dataSource={dataSource}
            dataLength={dataSource.length}
            pageType={false}
            searchText={this.state.searchText}
            isSelectColumns={true}
            operation={{
              searchText: this.searchText.bind(this),
              dataFilter: this.dataFilter.bind(this)
            }}/>
        </div>
        <div style={{margin: '15px'}}>
          <h3>后端操作/分页/排序/过滤</h3>
          <RearEndTable
            dataSource={toJS(this.store.sampleList)}
            dataLength={this.store.queryParams.page.total}
            currentPage={this.store.queryParams.page.current}
            setQueryParams={this.store.setQueryParams}
            getSampleList={this.store.getSampleList}
            resizable={true}
            isSelectColumns={true}
            isLoading={this.store.isLoading}/>
        </div>
        <div style={{margin: '15px'}}>
          <h3>可操作表格/后端数据</h3>
          <RearEndOperationTable
            dataSource={toJS(this.store.sampleList)}
            dataLength={this.store.queryParams.page.total}
            currentPage={this.store.queryParams.page.current}
            setQueryParams={this.store.setQueryParams}
            getSampleList={this.store.getSampleList}
            editRow={this.store.editRow}
            deleteRow={this.store.deleteRow}
            isEditRow={true}
            isDeleteRow={true}
            isAddRow={true}/>
        </div>
        <div style={{margin: '15px'}}>
          <h3>可操作表格/前端数据</h3>
          <FrontEndOperationTable
            dataSource={dataSource}
            resizable={true}
            pageType={false}
            isEditRow={true}
            isDeleteRow={true}
            isAddRow={true}/>
        </div>
      </div>
    )
  }
  searchText(e) {
    this.setState({searchText: e.target.value})
  }

  dataFilter(attr) {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({data: students.map((record) => {
        const match = record[attr].match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record
        };
      }).filter(record => !!record)
    }, () => console.log(this.state.data))
  }
}
// 简单表格
class CommonTable extends SimpleTable {
  renderColumns() {
    return [
      Column('姓名', 'name', false),
      Column('年龄', 'age', false),
      Column('性别', 'sex', false),
      Column('学校', 'school', false),
      Column('年级', 'grade', false),
      Column('三班', 'class', false),
      Column('学号', 'studentId', false),
    ]
  }
}
// 固定列/表头表格
class ChangeTable extends SimpleTable {
  configTable() {
    return {
      scroll: {x: '115%', y: 120}
    }
  }

  renderColumns() {
    return [
      Column('姓名', 'name', false, {fixed: 'left', width: '150px'}),
      Column('年龄', 'age', false, {width: '135px'}),
      Column('性别', 'sex', false, {width: '135px'}),
      Column('学校', 'school', false, {width: '135px'}),
      Column('年级', 'grade', false, {width: '135px'}),
      Column('三班', 'class', false),
      Column('学号', 'studentId', false, {fixed: 'right', width: '150px'}),
    ]
  }
}
// 前端分页/排序/过滤
class FrontEndTable extends PaginationTable {
  configTable() {
    return {
      bordered: true,
    }
  }

  renderColumns() {
    const self = this
    const { operation } = this.props
    return [
      Column('姓名', 'name', false, {
        sorter: (a, b) => {
          const field_a = a.name
          const field_b = b.name
          return sorter(field_a, field_b, 'string')
        },
        filterDropdown: (
          <div>
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="请输入出生日期"
              onChange={operation.searchText.bind(self)}
              onPressEnter={operation.dataFilter.bind(this, 'name')}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => setTimeout(() => this.searchInput.focus(), 100)
      }),
      Column('年龄', 'age', false, {
        sorter: (a, b) => {
          const field_a = a.age
          const field_b = b.age
          return sorter(field_a, field_b, 'number')
        },
        filterDropdown: (
          <div>
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="请输入出生日期"
              onChange={operation.searchText.bind(self)}
              onPressEnter={operation.dataFilter.bind(this, 'age')}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => setTimeout(() => this.searchInput.focus(), 100)
      }),
      Column('出生日期', 'birthday', false, {
        sorter: (a, b) => {
          const field_a = a.birthday
          const field_b = b.birthday
          return sorter(field_a, field_b, 'date')         
        },
        filterDropdown: (
          <div>
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="请输入出生日期"
              onChange={operation.searchText.bind(self)}
              onPressEnter={operation.dataFilter.bind(this, 'birthday')}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => setTimeout(() => this.searchInput.focus(), 100)
      }),
      Column('性别', 'sex', false),
      Column('学校', 'school', false),
      Column('年级', 'grade', false, {
        sorter: (a, b) => {
          const field_a = a.grade
          const field_b = b.grade
          return sorter(field_a, field_b, 'string')
        },
      }),
      Column('班级', 'class', false),
      Column('学号', 'studentId', false),
    ]
  }
}
// 后端分页/排序
class RearEndTable extends PaginationTable {
  constructor(props) {
    super(props)
    this.state = {...this.state}
  }

  configTable() {
    return {
      bordered: true,
    }
  }

  changeState = (field, e) => {
    this.setState({[field]: e.target.value})
  }

  queryParams() {
    const { patient_id } = this.state
    const conds = {
      patient_id: {$regex: patient_id},
      portalDataType: {$eq: "D_SAMPLE"}
    }
    if (!patient_id) {
      delete conds.patient_id
    }
    return conds
  }

  search = () => {
    const conds = this.queryParams()
    this.props.setQueryParams(
      {
        conds
      },
      {page: {current: 1}, change: true}
    )
    this.props.getSampleList()
  }

  renderColumns() {
    return [
      Column('病人编号', 'patient_id', true, {
        filterDropdown: (
          <div>
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="病人编号"
              onChange={(e) => this.changeState('patient_id', e)}
              onPressEnter={() => this.search()}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => setTimeout(() => this.searchInput.focus(), 100)
      }),
      Column('样本编号', 'sample_id', true),
      Column('样本类型', 'sample_type', true, {
        filters: [
          { text: '白细胞', value: '白细胞' },
          { text: '血浆', value: '血浆' },
        ],
      }),
      Column('时间', 'recruit_time', false),
      Column('实例类型', 'instance_type', false),
    ]
  }

  onChange = (page, filters, sorter) => {
    const set = []
    const orderMap = {
      descend: 'desc',
      ascend: 'asc',
    }
    Object.keys(page).length > 0 && set.push({
      page: { current: page.current, pageSize: page.pageSize }, change: true
    })
    if (Object.keys(sorter).length > 0) {
      set.push({ sort: [{ [sorter.columnKey]: orderMap[sorter.order] }] })
    } else {
      set.push({ sort: undefined })
    }
    this.props.setQueryParams(...set)
    this.props.getSampleList()
  }
}
// 前端表格操作-增删改查
class FrontEndOperationTable extends PaginationTable {
  configTable() {
    return {
      bordered: true,
    }
  }

  editDone(changeFields, currentRow, dataSource) {
    console.log(changeFields, currentRow)
  }

  deleteRow(currentRow, dataSource, index) {
    dataSource.splice(index, 1)
  }

  renderColumns() {
    return [
      Column('姓名', 'name', true),
      Column('年龄', 'age', false),
      Column('班级', 'class', false),
    ]
  }
}
// 后端表格操作-增删改查
class RearEndOperationTable extends PaginationTable {

  configTable() {
    return {
      bordered: true
    }
  }

  renderColumns() {
    return [
      Column('病人编号', 'patient_id', true),
      Column('样本编号', 'sample_id', true),
      Column('样本类型', 'sample_type', true),
    ]
  }

  editDone(changeFields, currentRow, dataSource) {
    const _id = currentRow._id
    this.props.editRow(_id, changeFields)
  }

  deleteRow(currentRow, dataSource, index) {
    const _id = currentRow._id
    if(!_id) {
      dataSource.splice(index, 1)
    } else {
      this.props.deleteRow(_id)
    }
  }

  onChange = (page, filters, sorter) => {
    const set = []
    const orderMap = {
      descend: 'desc',
      ascend: 'asc',
    }
    Object.keys(page).length > 0 && set.push({
      page: { current: page.current, pageSize: page.pageSize }, change: true
    })
    if (Object.keys(sorter).length > 0) {
      set.push({ sort: [{ [sorter.columnKey]: orderMap[sorter.order] }] })
    } else {
      set.push({ sort: undefined })
    }
    this.props.setQueryParams(...set)
    this.props.getSampleList()
  }
}

export default TablePage