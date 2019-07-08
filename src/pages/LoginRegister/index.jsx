import React, { useState } from 'react';
import { message } from 'antd';
import { Form, Input, Button } from '@1msoft/kant-ui';

import './index.less';
import LOGO from '@assets/images/login-logo.png';
import COLOURSDOT from '@assets/images/colours-dot.png';

const { FormItem, FormLayout } = Form;
const getGrid = FormItem.getGrid;

const CONST_TYPE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const LoginForm = (props) => {
  return (
    <div>
      <FormLayout>
        <FormItem
          row={1}
          span={getGrid(24)}>
          {
            props.form.getFieldDecorator("username", {
              rules: [{
                required: true,
                message: '请输入用户名!',
              }]
            })(
              <Input
                autoFocus={true}
                prefix={<i className="iconfont iconyonghu-geren icon-username"></i>}
                style={{ height: 50 }}
                onPressEnter={props.onPressEnter}
                placeholder=" 请输入用户名" />
            )
          }
        </FormItem>
        <FormItem
          row={2}
          span={getGrid(24)}>
          {
            props.form.getFieldDecorator("password", {
              rules: [{
                required: true,
                message: '请输入密码!',
              }]
            })(
              <Input
                type="password"
                style={{ height: 50 }}
                prefix={<i className="iconfont iconmima icon-password"></i>}
                onPressEnter={props.onPressEnter}
                placeholder=" 请输入密码" />
            )
          }
        </FormItem>
      </FormLayout>
      <span className="forget-password">忘记密码?</span>
    </div>
  );
};

const RegisterForm = (props) => {
  return (
    <FormLayout>
      <FormItem
        row={1}
        span={getGrid(24)}>
        {
          props.form.getFieldDecorator("username", {
            rules: [{
              required: true,
              message: '请输入用户名!',
            }]
          })(
            <Input
              autoFocus={true}
              prefix={<i className="iconfont iconyonghu-geren icon-username"></i>}
              style={{ height: 50 }}
              onPressEnter={props.onPressEnter}
              placeholder=" 请输入用户名" />
          )
        }
      </FormItem>
      <FormItem
        row={1}
        span={getGrid(24)}>
        {
          props.form.getFieldDecorator("password", {
            rules: [{
              required: true,
              message: '请输入密码!',
            }]
          })(
            <Input
              prefix={<i className="iconfont iconmima icon-password"></i>}
              style={{ height: 50 }}
              type="password"
              onPressEnter={props.onPressEnter}
              placeholder=" 请输入密码" />
          )
        }
      </FormItem>
      <FormItem
        row={1}
        span={getGrid(24)}>
        {
          props.form.getFieldDecorator("phone", {
            rules: [{
              required: true,
              message: '请输入手机号码!',
            }]
          })(
            <Input
              prefix={<i className="iconfont iconshouji icon-password"></i>}
              style={{ height: 50 }}
              onPressEnter={props.onPressEnter}
              placeholder=" 请输入手机号码" />
          )
        }
      </FormItem>
      <FormItem
        row={1}
        span={getGrid(24)}>
        {
          props.form.getFieldDecorator("verify", {
            rules: [{
              required: true,
              message: '请输入验证码!',
            }]
          })(
            <Input
              prefix={<i className="iconfont iconshouji icon-password"></i>}
              suffix={<span className="verify">获取验证码</span>}
              style={{ height: 50 }}
              onPressEnter={props.onPressEnter}
              placeholder=" 请输入验证码" />
          )
        }
      </FormItem>
    </FormLayout>
  );
};

const useStateHook = (props) => {
  const [type, setType] = useState(CONST_TYPE.LOGIN);
  const changeType = (val) => {
    if (val === type) return;
    setType(val);
    props.form.resetFields();
  };

  const onSubmit = (e) => {
    e && e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('---form-data----', values);
        message.success(`${type === CONST_TYPE.LOGIN ? '登陆' : '注册'}成功`);
        props.history.push('/');
      }
    });
  };

  let loginClassName = 'login-register-light';
  let registerClassName = 'login-register-dull';
  let btn_name = '登陆';

  let formDom = <LoginForm {...props} onPressEnter={onSubmit} />;

  if (type === CONST_TYPE.REGISTER) {
    loginClassName = 'login-register-dull';
    registerClassName = 'login-register-light';
    formDom = <RegisterForm {...props} onPressEnter={onSubmit} />;
    btn_name = '注册';
  }

  return {
    type,
    changeType,
    formDom,
    btn_name,
    onSubmit,
    loginClassName,
    registerClassName,
  };
};

let LoginRegister = (props) => {
  const state = useStateHook(props);
  return (
    <div className="login-register">
      <div>
        <img src={LOGO} alt="账户系统-logo" className="login-register-logo" />
        <div className="login-register-conten">
          <div className="login-register-conten-title">
            <span onClick={() => { state.changeType(CONST_TYPE.LOGIN); }}
              className={state.loginClassName}>
              登陆
              { state.type === CONST_TYPE.LOGIN &&
                <img src={COLOURSDOT} className="colours-dot" alt="彩色圆点" />
              }
            </span>
            <span style={{ width: 1 }} className="separate"></span>
            <span onClick={() => { state.changeType(CONST_TYPE.REGISTER); }}
              className={state.registerClassName}>
              注册
              { state.type === CONST_TYPE.REGISTER &&
                <img src={COLOURSDOT} className="colours-dot" alt="彩色圆点" />
              }
            </span>
          </div>
          <div className="login-register-form">
            { state.formDom }
          </div>
          <div className="login-register-submit">
            <Button
              className="submit"
              shape="round"
              type="primary"
              onClick={state.onSubmit}>
              { state.btn_name }
            </Button>
          </div>
        </div>
      </div>
      <div className="login-register-foot">Copyright  2019 英迈软件技术部出品</div>
    </div>
  );
};

LoginRegister = Form.create()(LoginRegister);

export default LoginRegister;
