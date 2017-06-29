import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Button, message, Modal, Form, Input } from 'antd';
import { observer, inject } from 'mobx-react'

import TopNavMenu from '../../components/layout/TopNavMenu'
import ContentBlock from '../../components/layout/ContentBlock'

import RouteHelper from '../../utils/RouteHelper'
import PermitHelper from '../../utils/PermitHelper'
import routes from '../../config/routes'
import logo from '../../assets/image/LOGO.png'
import bcrypt from '../../utils/bcrypt'
import cookie from '../../utils/cookie'

const { Header, Footer } = Layout;

@inject(['loginStore'])
@observer
class AppFrame extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.loginStore

    this.state = {
      permitCode: undefined,
      dialog: false
    }
  }

  componentWillMount() {
    if(cookie.get("_id") === undefined){
      // this.props.history.push('/login')
    } else {
      // this.store.findId(cookie.get("_id"))
    }

    this.permitHelper = new PermitHelper()
    this.routeHelper = new RouteHelper({
      routes,
      permitCode: this.state.permitCode,
      permitHelper: this.permitHelper,
    })
  }


  handleMenuClick(e) {
    if(e.key === '1'){
      this.displayDialog()
    }else if(e.key === '2'){
      this.clearStoreCoookie()
      message.info('退出系统')
    }else{
      message.info('异常')
    }
  }

  displayDialog = () => {
    if(this.state.dialog) {
      this.setState({
        oldPassWord: '',
        rOldPassWord: '',
        newPassWord: ''
      })
    }
    this.setState({
      dialog: !this.state.dialog
    })
  }

  changeState = (name) =>(e) => {
    this.setState({[name]: e.target.value});
  }

  subChangePass = () => {
    if (this.state.oldPassWord === this.state.rOldPassWord &&
        this.state.newPassWord !== '') {
      if (bcrypt.compareSync(this.state.oldPassWord, this.store.loginUser.password)) {
        this.store.changePassWord(this.store.loginUser._id, this.state.newPassWord, this.clearStoreCoookie)
        this.state.dialog = false
      } else {
        message.error("密码不正确")
      }
    } else {
      message.error("填写有误，按照提示修改")
    }
  }

  //清空 loginUser  cookie  返回登录页
  clearStoreCoookie = () => {
    this.store.loginUser = {}
    cookie.delete("_id")
    this.props.history.push("/login")
  }

  menu = (
  <Menu onClick={this.handleMenuClick.bind(this)}>
    <Menu.Item key="1"><Icon type="setting" /> 修改密码</Menu.Item>
    <Menu.Item key="2"><Icon type="poweroff" /> 退出系统</Menu.Item>
  </Menu>
  )

  render() {
    const { location } = this.props;

    if (location.pathname === '/login') {
      return null
    }

    const route = this.routeHelper.matchRoute(location.pathname)
    // console.log(location.pathname)
    // if(!route || !this.permitHelper.hasPermission(this.state.permitCode, route.code)){
    //   this.props.history.push('/notfound')
    // }
    let { routeTree: navList, selectedKeys } = this.routeHelper.getRouteTree('Index', route.routeName, { cascade: true })

    // 暂时代码：当当前用户为管理员时，才显示用户管理tab
    // if (!this.store.loginUser.isAdmin) {
    //   navList = navList.filter( (item) => item.routeName !== 'USER')
    // }

    const contentRoutes = this.routeHelper.getComponentRouteList('Index', { cascade: false })
    return(
      <Layout className="page-wrapper">
        {/* header */}
        <Header className="header">
          {/* Logo */}
          <div className="">
            <img src={logo} className="logo" alt={"AccuraGen"} />
          </div>
          {/* User Button */}
          <div className="version">
            <Dropdown overlay={this.menu} style={{ margin: 11 }}>
              <Button>
                 <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <TopNavMenu navList={navList} selectedKeys={selectedKeys} />
        </Header>
        {/* content */}
        <ContentBlock routes={contentRoutes} current={route} />
        {/* footer */}
        <Footer className="footer">
          Copyright &copy; 2017 Emsoft Incorporated. All rights reserved
        </Footer>
        {/* 弹窗 */}
        <ChangePassWDia
          state={this.state}
          displayDialog={this.displayDialog}
          changeState={this.changeState}
          subChangePass={this.subChangePass} />
      </Layout>
    );
  }
}

export default AppFrame

/**
 * 修改密码弹窗
 */
class ChangePassWDia extends Component{
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }

  render() {
    const {state, displayDialog, changeState, subChangePass} = this.props
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        {state.dialog ? <Modal
        title="修改密码"
        visible={state.dialog}
        onOk={subChangePass}
        onCancel={displayDialog}
        >
          <Form>
            <Form.Item label="旧密码：" labelCol={{ span: 7 }} wrapperCol={{ span: 14}}>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '旧密码不能为空'
                }, {
                  validator: this.checkConfirm
                }],
              })(
                <Input placeholder="请输入您的原密码"
                    type="password"
                    onChange={changeState('oldPassWord')}
                     />
              )}
            </Form.Item>
            <Form.Item label="再次旧密码：" labelCol={{ span: 7 }} wrapperCol={{ span: 14}}>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '重复密码不能为空!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input placeholder="请再次输入您的原密码"
                    type="password"
                    onChange={changeState('rOldPassWord')}
                     />
              )}
            </Form.Item>
            <Form.Item label="新密码：" labelCol={{ span: 7 }} wrapperCol={{ span: 14}}>
              { getFieldDecorator('newpassword', {
                rules: [{
                  required: true, message: '新密码不能为空'
                }]
              })(
                <Input placeholder="请输入您的新密码"
                    type="password"
                    onChange={changeState('newPassWord')}
                     />
              )}
            </Form.Item>
          </Form>
        </Modal> : null}
      </div>
    )
  }
}

ChangePassWDia = Form.create()(ChangePassWDia)
