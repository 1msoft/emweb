import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

/**
 * 金额格式化
 *
 * @export
 * @param {*} amount
 * @returns
 */
export function fmoney(amount) {
  amount = `${parseFloat(_.round(amount, 2)).toFixed(2)}`;
  let t = '';
  let m = amount.substring(0, 1);
  if (m === '-') {
    amount = amount.substring(1);
  } else {
    m = '';
  }
  let l = amount.split('.')[0].split('').reverse();
  let r = amount.split('.')[1];
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  return `${m}${t.split('').reverse().join('')}.${r}`;
}

/**
 * 银行卡数字格式化 - 四个数字补一个空格
 *
 * @export
 * @param {string} [val='']
 * @returns
 */
export function bankCardNo(val = '') {
  const mainAcctNo = val.replace(/(\d{4})/g, '$1 ');
  return mainAcctNo;
}

/**
 * 日期格式化
 *
 * @export
 * @param {*} time
 * @returns
 */
export function dateFormat(time) {
  const dateTime = time ? moment(time).format('YYYY-MM-DD') : '';
  return dateTime;
}

/**
 * 排序
 *
 * @export
 * @param {*} a
 * @param {*} b
 * @param {*} type
 * @returns
 */
export function sorter(a, b, type) {
  switch (true) {
    case type === 'date':
      const data_a = a
        ? isNaN(new Date(a))
          ? new Date('0000').getTime()
          : new Date(a).getTime()
        : new Date('0000').getTime();
      const data_b = b
        ? isNaN(new Date(b))
          ? new Date('0000').getTime()
          : new Date(b).getTime()
        : new Date('0000').getTime();
      return data_a - data_b;
    case type === 'number':
      const number_a = isNaN(parseFloat(a, 10))
        ? Number(Boolean(parseFloat(a, 10)))
        : parseFloat(a, 10);
      const number_b = isNaN(parseFloat(b, 10))
        ? Number(Boolean(parseFloat(b, 10)))
        : parseFloat(b, 10);
      return number_a - number_b;
    case type === 'string':
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    default:
      break;
  }
}

/**
 * 删除对象的空属性值
 *
 * @export
 * @param {*} o
 * @returns
 */
export function filterAttr(o) {
  if (o === "") return;
  if (typeof o !== 'object') return;
  for (let i in o) {
    if (!o[i] && o[i] !== 0) {
      delete o[i];
      filterAttr(o[i]);
      filterAttr(o);
    } else if (JSON.stringify(o[i]) === '{}') {
      delete o[i];
      filterAttr(o[i]);
      filterAttr(o);
    } else {
      filterAttr(o[i]);
    }
  }
  return ((o) => {
    if (JSON.stringify(o) === '{}') return null;
    for (let i in o) {
      if (o[i] === '') {
        delete o[i];
      } else if (JSON.stringify(o[i]) === '{}') {
        delete o[i];
      }
    }
    return o;
  })(o);
}

/**
 * 省市区格式化
 *
 * @export
 * @param {*} zoneArr
 * @returns
 */
export function returnZoneString(zoneArr) {
  if (zoneArr[0] === "北京" ||
    zoneArr[0] === "天津" ||
    zoneArr[0] === "上海" ||
    zoneArr[0] === "重庆") {
    return `${zoneArr[0]}市${zoneArr[2]}`;
  } else if (zoneArr[0] === "香港" || zoneArr[0] === "澳门") {
    return `${zoneArr[0]}特别行政区${zoneArr[2]}`;
  } else if (zoneArr[0] === "台湾") {
    return `${zoneArr[0]}省${zoneArr[2]}`;
  } else {
    return `${zoneArr[0]}省${zoneArr[1]}市${zoneArr[2]}`;
  }
}

/**
 * 获取cookie
 *
 * @export
 * @param {*} name
 * @returns
 */
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr)
    return unescape(arr[2]);
  else
    return null;
}

/**
 * 设置cookie
 *
 * @export
 * @param {*} key
 * @param {*} val
 * @param {*} data
 * @param {*} path
 */
export function setCookie(key, val, data, path) {
  const dataStr = data ? `;expires=${data}` : ' ';
  const pathStr = path ? `;path=${path}` : ' ';
  document.cookie = `${key}=${val}${dataStr}${pathStr}`;
}

/**
 * 删除cookie
 *
 * @export
 * @param {*} key
 */
export function delCookie(key) { //删除cookie方法
  var date = new Date(); //获取当前时间
  date.setTime(date.getTime() - 10000); //将date设置为过去的时间
  document.cookie = `${key}=v;expires=${date.toGMTString()}`;  //设置cookie
}

/**
 * 加密算法
 *
 * @export
 * @param {*} data
 * @returns
 */
export function encrypt(data) {
  var key = CryptoJS.enc.Latin1.parse('sd7JD8sKzc8MHdf8');
  var iv = CryptoJS.enc.Latin1.parse('29JlOd8SCdk82CFd');
  var encrypted = CryptoJS.AES.encrypt(
    data,
    key,
    {
      iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
    });
  return `${encrypted}`;
}

/**
 * RSA加密
 * @param {*} data
 */
export function rsaEncrypt(data){
  const encrypt = new JSEncrypt();
  const pubkey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
  -----END PUBLIC KEY-----`;
  encrypt.setPublicKey(pubkey);
  const encrypted = encrypt.encrypt(data);
  return encrypted;
}

/**
 * 计算字符串长度(中英文)
 * @param {*} str
 */
export function getStrLenth(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    }
    else {
      len += 2;
    }
  }
  return len;
}

/**
 * 单号生成器
 * @param {String} prefix 前缀
 */
export const genBizCode = prefix => {
  const bizCode = `${prefix}${new Date().getTime()}`;
  return bizCode;
};

/**
 * 高阶组件：封装一个方法
 * @param {Component} Comp 组件
 */
export const jurisdiction = (Comp) => {
  /**
   * Jurisdiction
   *
   * @class Jurisdiction
   * @extends {Comp}
   */
  @inject('appFrame')
  @observer
  class Jurisdiction extends Comp{
    // 判断用户是否具有指定权限 传入 actionName 返回 true || false
    hasJurisdiction = (actionName) => {
      const { appFrame } = this.props;
      const { user } = appFrame;
      const { operationUrl = {} } = user;
      // return false;
      return !!operationUrl[actionName];
    }
  }
  return Jurisdiction;
};

/**
 * 手动取消焦点
 * @param {Object} ref react ref
 */
export const commonBlur = (ref) => {
  const timer = setTimeout(() => {
    ref.blur();
    clearTimeout(timer);
  }, 0);
};

/**
 * 将 location.search 部分转换为对象
 * @param {String} search url中查询字符串
 * 在react-router中可通过 this.props.location.search 获取 location.search
 */
export const searchToObject = (search) => {
  if(!search) return null;
  search = search.substr(1);
  const arr = search.split("&");
  const obj = {};
  let newArr = [];
  arr.map((value,index,arr) => {
    newArr = value.split("=");
    if(newArr[0] && newArr[1]) {
      obj[newArr[0]] = unescape(newArr[1]);
    }
  });
  return obj;
};
