import _ from 'lodash';
import React, { Component, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useModal } from '../../../../hooks';
import {
  Layout, Icon, Input, Badge, Popover, Menu,
  Dropdown, Tabs, List, Form, Modal
} from 'antd';
import boyImg from '../../../../assets/images/boy.png';
import girlImg from '../../../../assets/images/girl.png';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const avatarImg = {
  boy: boyImg,
  girl: girlImg
};

export default ({siderStore}) => {
  const changePwModalStore = useModal();

  const onCollapse = useCallback(() => {
    siderStore.toggleCollapsed();
  });

  return (
    <Layout.Header
      style={{
        background: '#fff',
        borderBottom: '1px solid #dedede',
        position: 'relative'
      }}>
      <Icon
        className="trigger"
        onClick={onCollapse.bind(this)}
        type={ siderStore ? 'menu-unfold' : 'menu-fold'}
      />
      <div className="header-wrapper clearfix">
        <span style={{ fontSize: 20 }}>商品房预售资金监管系统</span>
        <UserDropdown changePwModalStore={changePwModalStore}/>
        <ModalBlock changePwModalStore={changePwModalStore}/>
        <MessageBlock />
        <SearchBlock />
      </div>
    </Layout.Header>
  );
};

@withRouter
class UserDropdown extends Component{

  // 重置密码
  resetPassword = () => {
    this.props.changePwModalStore.openModal({
      title: '修改密码'
    });
  }

  // 退出登录
  logout = () => {
    this.props.history.push('/login')
  }

  // 点击菜单
  onClick = ({ item, key, keyPath }) => {
    const map = {
      "0": this.resetPassword,
      "1": this.logout
    };
    map[key] && map[key]();
  }

  render(){
    const user = {sex: 'boy', name: 'admin'};
    return (
      <span className="user">
        <Dropdown
          overlay={
            <Menu onClick={this.onClick}>
              <Menu.Item key='0'>
                <Icon type="edit"
                  style={{ marginRight: '10px' }} />
                <span>修改密码</span>
              </Menu.Item>
              <Menu.Item key='1'>
                <Icon type="logout"
                  style={{ marginRight: '10px' }} />
                <span>退出登录</span>
              </Menu.Item>
            </Menu>}>
          <span style={{ fontSize: '14px', cursor: 'pointer' }}>
            <span style={{ display: 'inline-block', width: '20px', marginRight: '8px' }}>
              <img style={{width: '100%'}} src={avatarImg[user.sex]} alt="avatarImg"/>
            </span>
            <span style={{ position: 'relative', top: 1 }}>{user.name}</span>
          </span>
        </Dropdown>
      </span>
    );
  }
}

class MessageBlock extends Component{
  render(){
    return (
      <span className="bell-wrapper"
        onClick={() => { }}>
        <Popover
          placement="bottomRight"
          content={this.content}
          trigger="click">
          <Badge count={100}>
            <Icon type="bell" className="global-icon" style={{ marginRight: '0px' }} />
          </Badge>
        </Popover>
      </span>
    );
  }

  get content(){
    const renderDom = (
      <Tabs defaultActiveKey="1" >
        <TabPane tab="消息" key="1">
          <List style={{minWidth: '300px'}}>
            <List.Item>
              <List.Item.Meta title={<div style={{textAlign: 'center'}}>暂无消息</div>}/>
            </List.Item>
          </List>
        </TabPane>
      </Tabs>
    );
    return renderDom;
  }
}

class SearchBlock extends Component{

  constructor(props){
    super(props);
    this.value = '';
    this.inputRef = new React.createRef();
    this.state = {
      showInput: false,
    };
  }

  // 切换输入框的显示状态
  toggleShowInput = () => {
    this.setState({showInput: !this.state.showInput}, () => {
      if (this.state.showInput && this.inputRef.current.focus ){
        this.inputRef.current.focus();
      }
    });
  }

  // 设置 value
  setValue = (event) => {
    this.value = event.target.value;
  };

  // 失去焦点事件
  onBlur = () => {
    this.toggleShowInput();
  }

  // 搜索
  onSearch = () => {
    console.log('---- 查询 ---', this.value);
    this.toggleShowInput();
  }

  render(){
    return (
      <span className="auto-search-wrapper" >
        <span style={{paddingTop: '3px', display: 'inline-block'}}>
          <Icon
            type="search"
            className="global-icon"
            onClick={this.toggleShowInput}
            style={{ marginRight: this.state.showInput ? '8px' : '0' }}
          />
        </span>
        <Input
          size="large"
          placeholder="搜索"
          ref={this.inputRef}
          onBlur={this.onBlur}
          className="search-input"
          onChange={this.setValue}
          onPressEnter={this.onSearch}
          style={{ width: this.state.showInput ? '210px' : '0' }}
        />
      </span>
    );
  }
}

class ModalBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckNextPasswd: false
    };
  }

  onOk(e) {
    const { validateFields, getFieldsValue } = this.props.form;
    validateFields((err, values) => {
      if (!err){
        console.log('------ values ------');
        console.log(values);
        this.props.changePwModalStore.closeModal();
      }
    });
  }

  // 再次确认密码是否已经输入过值
  autoConfirmCheck(e) {
    const value = e.target.value;
    this.setState({ isCheckNextPasswd: this.state.isCheckNextPasswd || !!value });
  }

  // 在输入新密码时，如果'确认密码输入框'输入过值则对其进行验证
  validateToNextPassword(rules, value, callback) {
    const form = this.props.form;
    if (value && this.state.isCheckNextPasswd) {
      form.validateFields(['newPassword'], { force: true });
    }
    callback();
  }

  // 验证两次密码是否相同
  compareToFirstPassword(rules, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { changePwModalStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    const layouItem = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    };
    return (
      <Modal
        title={changePwModalStore.data.title}
        destroyOnClose
        visible={changePwModalStore.isOpen}
        onCancel={changePwModalStore.closeModal}
        okText="确认"
        cancelText="取消"
        onOk={this.onOk.bind(this)}
        maskClosable={false}>
        <Form>
          <FormItem {...layouItem} label="旧密码">
            {
              getFieldDecorator('oldPassword', {
                rules: [
                  { required: true, message: '请输入旧密码' }
                ],
              })(<Input
                type="password"
                style={{ width: '210px' }}
                placeholder="请输入旧密码" />)
            }
          </FormItem>
          <FormItem {...layouItem} label="新密码">
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入新密码' },
                  { validator: this.validateToNextPassword.bind(this) }
                ],
              })(<Input
                type="password"
                style={{ width: '210px' }}
                placeholder="请输入新密码" />)
            }
          </FormItem>
          <FormItem {...layouItem} label="再次确认">
            {
              getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请再次确认密码' },
                  { validator: this.compareToFirstPassword.bind(this) }
                ],
              })(<Input
                type="password"
                style={{ width: '210px' }}
                placeholder="请再次确认密码"
                onBlur={this.autoConfirmCheck.bind(this)} />)
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ModalBlock = Form.create({})(ModalBlock);
