import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { setCookie, encrypt } from '../../utils/helper';
import userImg from '../../assets/images/userBg.png';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
     this.setLoginBackgroundSize();
     window.onresize = this.setLoginBackgroundSize;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const layout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    };
    return (
      <div className="login" id="login">
        <div className="login-center">
          <div className="login-content-right">
            <div className="login-form-position">
              <div className="form">
                <div className="user-bg">
                  <img src={userImg} alt=""/>
                </div>
                <h2>系统登录</h2>
                <Form style={{padding: '0 0.30rem'}}>
                  <FormItem {...layout}>
                    {
                      getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }]
                      })(<Input
                        style={{fontSize: '0.16rem', height: '0.48rem'}}
                        placeholder="请输入用户名"
                        size="large"
                        prefix={<Icon type="user" style={{fontSize: '0.20rem'}} />}
                        onKeyDown={(e) => { if (e.keyCode === 13) { this.handleLogin(e) } }} />)
                    }
                  </FormItem>
                  <FormItem {...layout}>
                    {
                      getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '请输入密码' },
                          // { min: 6, message: '密码长度必须大于6位字符' },
                        ]
                      })(<Input
                        style={{fontSize: '0.16rem', height: '0.48rem'}}
                        placeholder="请输入密码"
                        prefix={<Icon type="lock" style={{fontSize: '0.20rem'}}/>}
                        type="password"
                        size="large"
                        onKeyDown={(e) => { if (e.keyCode === 13) { this.handleLogin(e) } }} />)
                    }
                  </FormItem>
                  <Button type="primary" style={{ width: '100%', height: '0.60rem', fontSize: '0.24rem'}}
                      onClick={this.handleLogin.bind(this)}>登录</Button>
                </Form>
              </div>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
        
        <div className="login-footer">
          <div style={{ marginBottom: '0.10rem', color: '#fff'}}>
            <Link style={{ color: '#fff', padding: '0 0.20rem' }} to="/">帮助</Link>|
            <Link style={{ color: '#fff', padding: '0 0.20rem' }} to="/">隐私</Link>|
            <Link style={{ color: '#fff', padding: '0 0.20rem' }} to="/">条款</Link>
          </div>
          <div style={{ color: '#fff' }}>Copyright &copy; 2018 福建英迈软件有限公司</div>
        </div>
      </div>
    );
  }

  // 设置 html font-size字体大小 
  // relyOnW: 是否根据高度计算值  true || false
  setHtmlFontSize = (relyOnW) => {
    // 缩放比例：自己瞎加的
    const fontAdjustment = 1;
    // 假设 设计稿为: 1920 * 1008
    let scale;
    if(relyOnW){
      // 按照宽度缩放比例计算字体大小
      scale = document.body.clientWidth / 1920;
    } else {
      // 安装高度缩放比例计算字体大小
      scale = document.body.clientHeight / 1008;
    }
    const fontSize = 100 * scale * fontAdjustment + 'px';
    document.getElementsByTagName('html')[0].setAttribute('style', `font-size: ${fontSize}`);
  }

  // 设置背景图大小:
  setLoginBackgroundSize = () => {
    const dom = document.getElementById('login');
    const bodyW = document.body.clientWidth;
    const bodyH = document.body.clientHeight;
    // 背景图: 1920 * 1008
    // 计算当前背景图高度:
    const scale = bodyW / 1920;
    const bgH = 1008 * scale;
    if(bgH <  bodyH){
      // 计算 html 字体大小; 根据高度缩放
      this.setHtmlFontSize(false);
      dom && dom.setAttribute('style', 'background-size: auto 100%');
    } else {
      // 计算 html 字体大小; 根据宽度缩放
      this.setHtmlFontSize(true);
      dom && dom.setAttribute('style', 'background-size: 100% auto');
    }
  }

  // 登录
  handleLogin(e) {
    e.preventDefault();
    const { validateFields, getFieldsValue } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const body = getFieldsValue();
        console.log('------ 登录 ------');
        this.props.history.push('/home');        
      }
    });
  }
}
Login = Form.create({})(Login);

export default Login;
