/**
 * 通用工具类
 * @module Helper
 */
import moment from 'moment'

/**
 * 金额格式化
 *
 * @export
 * @param {String|Number} amount 金额
 * @returns {String} 格式化后金额
 */
export function fmoney(amount) {
  amount = `${parseFloat(amount).toFixed(2)} `;
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
 * 日期格式化
 *
 * @author JFJ
 * @export
 * @param {Date} time 日期
 * @returns {String} 格式化后日期
 */
export function dateFormat(time) {
  const dateTime = time ? moment(time).format('YYYY-MM-DD') : ''
  return dateTime
}

//排序
/**amazon
 * 排序方法
 *
 * @author JFJ
 * @export
 * @param {*} a
 * @param {*} b
 * @param {String} type 类型
 * @returns {Number} 排序类型
 */
export function sorter(a, b, type) {
  switch (true) {
    case type === 'date':
      const data_a = a ? isNaN(new Date(a)) ? new Date('0000').getTime() : new Date(a).getTime() : new Date('0000').getTime()
      const data_b = b ? isNaN(new Date(b)) ? new Date('0000').getTime() : new Date(b).getTime() : new Date('0000').getTime()
      return data_a - data_b
    case type === 'number':
      const number_a = isNaN(parseFloat(a, 10)) ? Number(Boolean(parseFloat(a, 10))) : parseFloat(a, 10)
      const number_b = isNaN(parseFloat(b, 10)) ? Number(Boolean(parseFloat(b, 10))) : parseFloat(b, 10)
      return number_a - number_b
    case type === 'string':
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    default:
      break
  }
}

/**
 * 过滤对象空属性
 *
 * @author JFJ
 * @export
 * @param {*} o 过滤源
 * @returns {Object} 过滤之后的对象
 */
export function removeEmptyProperty(o) {
  if (o === "") return
  if (typeof o !== 'object') return
  for (let i in o) {
    if (!o[i] && o[i] !== 0) {
      delete o[i]
      removeEmptyProperty(o[i])
      removeEmptyProperty(o)
    } else if (JSON.stringify(o[i]) === '{}') {
      delete o[i]
      removeEmptyProperty(o[i])
      removeEmptyProperty(o)
    } else {
      removeEmptyProperty(o[i])
    }
  }
  return ((o) => {
    if (JSON.stringify(o) === '{}') return null
    for (let i in o) {
      if (o[i] === '') {
        delete o[i]
      } else if (JSON.stringify(o[i]) === '{}') {
        delete o[i]
      }
    }
    return o
  })(o)
}
