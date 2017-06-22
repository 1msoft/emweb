/**
 * 使用例子:
 * QueryFormsInput('input', 'casesNo', '病例编号:', 'number', '请输入',
                      {onChange:()=>{console.log('+++++++')}})
 */
export const QueryFormsInput =
  (type, text, InputType, placeholder, eventFunction, value) => {
  return Object.assign({type, text, InputType, placeholder, eventFunction, value })
}

/**
 * 使用例子:
 * QueryFormsSelect('select', '性别:', '请输入',
                      [{opText: '男', opValue: 'man'}, {opText: '女', opValue: 'woman'}],
                      {onSelect:()=>{console.log('+++++++性别')}})
 */
export const QueryFormsSelect =
  (type, text, placeholder, option, eventFunction, value) => {
  return Object.assign({type, text, placeholder, option, eventFunction, value })
}

/**
 * 使用例子:
 *  QueryFormsButton('button', '查询', 'large', 'primary', 'search',
                        {onClick:() => {console.log('+++++++查询')}})
 */
export const QueryFormsButton =
  (type, text, size, buttonType, icon, eventFunction) => {
  return Object.assign({type, text, size, buttonType, icon, eventFunction })
}

export const QueryFormsTimePicker =
  (type, text, placeholder, eventFunction, value) => {
    return Object.assign({type, text, placeholder, eventFunction, value})
  }