import React from 'react';
import { message, Icon } from "antd";
import { observable, action, autorun, computed, toJS } from 'mobx';

// 请求记录最大值
const HISTORIES_SIZE = 10;

// http 请求状态
const HETTP_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

// 后端返回响应状态
const RES_STATUS = {
  SUCCESS: 0,
  ERROR: 1,
};

// 根据响应信息判断请求是否成功 response
const isSuccess = ({ status, res }) => {
  if (!res || !res.response){return false;}
  const conds = [
    status !== HETTP_STATUS.ERROR,
    res.response.status !== RES_STATUS.ERROR,
  ];
  return conds.every( v => v);
};

// 渲染提示框内容
const MessageInfo = (props) => {
  let { apiCode, key } = props.data;
  const onClick = () => props.onClick({ key });
  return (
    <span>
      [{apiCode}]
      {isSuccess(props.data)  ? '调用成功' : '调用失败'}
      <span onClick={onClick} className="link"> 查看详情 </span>
    </span>
  );
};

/**
 * 请求 扩展 store
 */
class Request {
  constructor(){
    autorun(this.print);
  }

  // 请求历史记录,约定数据格式: [Object] 具体查看 this.push 方法
  @observable histories = [];

  // 当前查阅的请求信息
  @observable requestInfo = null;

  // 在途请求数
  @observable inTransitRequests = 0;

  // 查阅某个请求
  @action
  consult = ({ key }) => {
    this.requestInfo = this.histories.find( v => (v.key === key)) || {};
  };

  // 取消查阅
  @action
  cancelConsult = () => {
    this.requestInfo = null;
  };

  /**
   * 添加请求记录
   * @param {Object} values           当条请求需要记录的数据（最好按照约定存储数据）
   * @param {Number} values.key       唯一 key 值（时间戳）
   * @param {Object} values.status    请求状态， 参考常量 HTTP_STATUS
   * @param {Object} values.apiCode   api 编号
   * @param {Object} values.req       请求数据
   * @param {Object} values.res       响应数据
   */
  @action
  push = (values) => {
    values = { ...values };
    if (this.histories.length === HISTORIES_SIZE){this.histories.shift();}
    values.apiCode = values.apiCode || '未定义 apiCode';
    this.histories = [...this.histories, { ...values }];
  }

  // 结束请求
  @action
  endRequest = (values) => {
    // 1. 添加请求记录
    this.push(values);
    // 2. 显示请请求响应信息
    this.showMessage(values);
    // 2. 在途请求数 -1
    this.inTransitRequests -= 1;
  };

  // 显示请求响应信息
  @action
  showMessage = (values) => {
    // 如果不存在 apiCode 则不显示反馈信息
    if (!values.apiCode){return false;}
    const type = isSuccess(values) ? 'success' : 'error';
    message[type](<MessageInfo data={values} onClick={this.consult}/>);
  }

  // 开始请求
  @action
  startRequest = () => {
    // 1. 在途请求数 + 1
    this.inTransitRequests += 1;
  };

  // 计算是否请求中
  @computed get requesting() {
    return this.inTransitRequests > 0;
  }

  // 打印状态
  print = () => {
    console.group('%c[store][Request]: 请求状态', 'color: green');
    console.log('requestInfo: 当前请求记录', toJS(this.requestInfo));
    console.log('inTransitRequests: 在途请求数', this.inTransitRequests);
    console.log('histories: 请求历史', toJS(this.histories));
    console.log('requesting: 是否在请求中', this.requesting);
    console.groupEnd();
  }
}

export default Request;
