import moment from 'moment';
import { getCookie, setCookie } from './helper';
import { createHashHistory } from 'history';
import { setTimeout } from 'core-js/library/web/timers';

const history = createHashHistory();

/**
 * 拼接 query 请求参数
 * @param {Object} params 请求参数
 */
function queryParams(params) {
  let queryString = '';
  let arr = [];
  for (let key in params) {
    if (params[key] || [false, 0].some(item => item === params[key])) {
      const value = typeof params[key] === 'string' ?
        params[key] : JSON.stringify(params[key]);
      arr.push(`${key}=${encodeURIComponent(value)}`);
    }
  }
  queryString += arr.join('&');
  return queryString;
}

/**
 * fetch
 *
 * @param {*} method  方法
 * @param {*} url     请求地址
 * @param {*} query   查询条件
 * @param {*} param   参数
 * @param {*} body    body
 * @param {*} headers 请求头
 * @returns
 */
function fetchRequest(method, url, query, param, body, headers, isFormDate) {
  let request;
  let path = '';
  body = isFormDate ? queryParams(body) : body;
  switch (method) {
    case 'GET':
      // 参数添加时间戳
      const reQuery = Object.assign({}, query);
      const reQueryString = queryParams(reQuery);
      path = `${url}${param ? `/${param}` : ''}${reQueryString ? `?${reQueryString}` : ''}`;
      request = fetch(path, {
        method,
      });
      break;
    default:
      const queryString = queryParams(query);
      path = `${url}${param ? `/${param}` : ''}${queryString ? `?${queryString}` : ''}`;
      request = fetch(path, {
        headers,
        method,
        body,
      });
      break;
  }
  console.log(`%cFetchRequest ${method}: `, 'color: #6eafd4', query);
  return request.then(res => res.json()).then(res => res);
};

/**
 * fetchHelper
 *
 * @export
 * @param {*} queryParams        查询参数
 * @param {*} [globalStore={}]   全局store
 */
export default function fetchHelper(queryParams, globalStore = {}) {
  const { method, url, query, param, body, headers, isFormDate, callback } = queryParams;
  if (typeof method !== 'string') {
    throw new Error('requestType not specified: 需要指定请求类型');
  }
  if (typeof url !== 'string') {
    throw new Error('url not specified: 需要指定请求api');
  }
  // const timeStamp = new Date().getTime();
  // 请求开始: 调用全局 store request 模块的 startRequest 方法
  globalStore.request.startRequest();
  (globalStore.loading === false) && globalStore.loadingStart();
  fetchRequest(method, url, query, param, body, headers, isFormDate).then(
    (res) => {
      callback && callback(res);
      //终止请求: 调用全局 store request 模块的 endRequest 方法
      globalStore.request.endRequest({
        res,
        // key: timeStamp,
        status: 'success',
        req: { method, url, queryRequest: query, pathRequest: param, body, headers }
      });
      return res;
    }
  ).catch((res) => {
    //终止请求: 调用全局 store request 模块的 endRequest 方法
    globalStore.request.endRequest({
      res,
      // key: timeStamp,
      status: 'error',
      req: { method, url, queryRequest: query, pathRequest: param, body, headers }
    });
    // throw error;
  });
}
