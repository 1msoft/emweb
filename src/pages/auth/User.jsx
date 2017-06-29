import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Link } from 'react-router-dom'
import { Layout, Button, Input, Form } from 'antd'
import moment from 'moment'
// import TableBlock from '../../components/TableBlock'
import PaginationTable from '../../components/table/PaginationTable'
import DialogPage from '../../components/modal/DialogPage'
import { Column, ActionColumn } from '../../components/table/TableElements'
// import QueryForm from '../../components/QueryForm'
// import { QueryFormsInput, QueryFormsButton } from '../../components/QueryFormElement'


const FormItem = Form.Item

@inject(['userStore'])
@observer
class User extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.userStore
  }

  render() {
    console.log("=======")
    return (
      <div>
      <Layout className="main-wrapper">
        <QueryBlock
          getQueryParams={this.store.getQueryParams}
          setQueryParams={this.store.setQueryParams}
          getUserList={this.store.getUserList} />
        <div className="user-table">
          <UserTable
            dataLength={this.store.getQueryParams.page.total}
            currentPage={this.store.getQueryParams.page.current}
            setQueryParams={this.store.setQueryParams}
            getUserList={this.store.getUserList}
            dataSource={toJS(this.store.userList)}
            onRowEdit={this.onRowEdit}
            onDelete={this.onDelete}
            onReset={this.onReset} />
        </div>
      </Layout>
      </div>
    )
  }

  onRowEdit = (_id) => {
    console.log("edit", _id)
    this.store.setCurrentUserId(_id)
    this.props.history.push(`/user/edit/${_id}`)
  }

  onDelete = (_id) => {
    console.log("delete", _id)
    this.store.onDelete(_id)
  }

  onReset = (_id) => {
    console.log("reset", _id)
    this.store.onReset(_id)
  }
}

@observer
class QueryBlock extends Component {
  state = {...this.props.getQueryParams.conds}

  render() {
    return (
      <div className="block-query">
        <Input placeholder="用户名"
          defaultValue={this.state.username.$regex}
          onChange={this.changeState('username')} />
        <span className="raised-button">
          <Button type="primary" icon="search" onClick={this.onQuery}> 搜索
          </Button>
        </span>
        <span className="raised-button right">
          <Link to="/user/add">
            <Button type="primary" icon="user-add"> 新增用户 </Button>
          </Link>
        </span>
        <div className="clear"></div>
      </div>
    )
  }

  changeState = (key) => (e) => {
    this.setState({ [key]: e.target.value })
  }

  onQuery = () => {
    this.props.setQueryParams(
      {conds: {username: {$regex: this.state.username}}},
      {page: {current: 1}, change: true}
    )
    this.props.getUserList()
  }
}


@observer
class UserTable extends PaginationTable {
  /*renderColumns() {
    const self = this
    return [
    // {
    //   title: '账号',
    //   dataIndex: 'num',
    //   key: 'num',
    // },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '联系方式',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      render(text, record, index) {
        return (
          <div>
            <span>
              {moment(record.time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        )
      }
    },
    // {
    //   title: '创建人',
    //   dataIndex: 'creater',
    //   key: 'creater',
    //   render(text, record, index) {
    //     return (
    //       <div>
    //         <span>
    //           {(record.name)}
    //         </span>
    //       </div>
    //     )
    //   }
    // },
    {
      title: '操作',
      key: 'operation',
      render(text, record, index) {
        return (
          <div>
            <Popconfirm title="确认重置"
              onConfirm={() => self.props.onReset(record._id, record)}>
              <a><Icon type="reload" /> 重置密码 </a>
            </Popconfirm>
            <span onClick={() => self.props.onRowEdit(record._id)}>
              <a><Icon type="edit" /> 编辑 </a>
            </span>
            <Popconfirm title="确认删除" onConfirm={() => self.props.onDelete(record._id)}>
              <a><Icon type="delete" /> 删除 </a>
            </Popconfirm>
          </div>
        )
      }
    }]
  }*/

  renderColumns() {
    return [
      Column('用户名', 'username'),
      Column('联系方式', 'tel'),
      Column('邮箱', 'email'),
      Column('创建时间', 'time', false, false, {
        render(text, record, index) {
          return (
            <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
          )
        }
      }),
      ActionColumn('操作', 'operation')([
        {text: '重置密码 |', title: "确认重置", type: 'reload', icon: 'edit', onConfirm: (record) => this.props.onReset(record._id)},
        {text: '编辑 | ', type: 'link', path: (record) => `/user/edit/${record._id}`, onClick: (record) => this.props.onRowEdit(record._id)},
        {text: '删除', title: "确认删除", type: 'delete', icon: 'delete', onConfirm: (record) => this.props.onDelete(record._id)}
      ]),
    ]
  }

  // 调用Action修改分页、筛选条件
  onChange = (page, filters) => {
    const set = []
    Object.keys(page).length > 0 && set.push({
      page: { current: page.current, pageSize: page.pageSize },
      change: true
    })
    this.props.setQueryParams(...set)
    this.props.getUserList()
  }
}

@inject(['userStore'])
@observer
class UpsertUser extends DialogPage {
  modalProps = {
    title: '新增用户'
  }

  constructor(props) {
    super(props)
    // console.log("props", props)
    this.store = this.props.userStore
    // console.log("store", this.store)
  }

  componentWillMount() {
    const id = this.props.match.params.id
    if(!id) {
      this.store.create()
      // console.log("create", this.store.create())
    } else {
      this.modalProps.title = '编辑用户'
      this.store.setCurrentUserId(id)
    }
    // console.log(this)
  }

  componentWillUnMount() {

    this.props.match.params.id = null
  }

  renderContent() {
    const currentUser = this.store.currentUser
    // const id = this.props.match.params.id
    // const title = this.props.defaultProps.title
    const FormItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    }

    return (
      <Form layout="horizontal">
      {/*
            <FormItem label="账号:" {...FormItemLayout}>
              <Input placeholder="账号"
                value={currentUser.num}
                onChange={this.handleChange.bind(this.store)('num')} />
            </FormItem>*/}
            <FormItem label="用户名:" {...FormItemLayout}>
              <Input placeholder="用户名"
                value={currentUser.username}
                onChange={this.handleChange.bind(this.store)('username')} />
            </FormItem>
            <FormItem label="联系方式:" {...FormItemLayout}>
              <Input placeholder="联系方式"
                value={currentUser.tel}
                onChange={this.handleChange.bind(this.store)('tel')} />
            </FormItem>
            <FormItem label="邮箱:" {...FormItemLayout}>
              <Input placeholder="邮箱"
                value={currentUser.email}
                onChange={this.handleChange.bind(this.store)('email')} />
            </FormItem>
          </Form>
    )


  }

  handleChange = (property) => (e) => {
    // console.log("e.target.value", e.target.value)
    this.store.currentUser.setProperty(property, e.target.value)
  }

  onOk() {
    // console.log("ok",this.store.currentUser)
    this.store.submit(this.store.currentUser)

  }
}



export {
   User,
   UpsertUser,
}
