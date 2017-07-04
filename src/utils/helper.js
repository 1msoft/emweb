import moment from 'moment'

//金额格式化
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
  for (let i = 0; i < l.length; i ++ ) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  return `${m}${t.split('').reverse().join('')}.${r}`;
}

//日期格式化
export function dateFormat(time) {
  const dateTime = time ? moment(time).format('YYYY-MM-DD') : ''
  return dateTime
}

//排序
export function sorter(a, b, type) {
  switch(true) {
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