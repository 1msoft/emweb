/**
 * 表单组件工具
 * @author kjx
 */
import React from 'react';
import { Form, Select, Input, DatePicker, InputNumber } from "@1msoft/kant-ui";
import { DatePicker as AntDatePicker, TimePicker as AntTimePicker } from 'antd';

const ROW_LENGTH = 3;
const SPAN_LENGTH = 6;
const { FormItem } = Form;
const getGrid = FormItem.getGrid;
const TextArea = Input.TextArea;
const AntMonthPicker = AntDatePicker.MonthPicker;

export const inputBox = (type, props) => {
  switch (type) {
    case 'input':
      return <Input style={{ width: '100%' }} {...props} />;
    case 'select':
      return <Select style={{ width: '100%' }} {...props} />;
    case 'date-picker':
      return <DatePicker {...props} />;
    case 'ant-date-picker':
      return <AntDatePicker style={{ width: '100%' }} {...props} />;
    case 'ant-month-picker':
      return <AntMonthPicker style={{ width: '100%' }} {...props} />;
    case 'ant-time-picker':
      return <AntTimePicker style={{ width: '100%' }} {...props} />;
    case 'input-number':
      return <InputNumber {...props} />;
    case 'text-area':
      return <TextArea {...props} />;
    default:
      return;
  }
};

/**
 * 表单 FormItem 渲染
 */
export const renderFormItems = (dataSource, props, config = {}) => {
  const {
    rowLength = ROW_LENGTH,
    span = SPAN_LENGTH,
    labelSuffix,
    formItemConfig = {} } = config;
  const formItemDom = [];
  for (let i = 0; i < dataSource.length; i++) {
    const data = dataSource[i];
    const label = labelSuffix ? `${data.title}${labelSuffix}` : data.title;
    formItemDom.push(
      <FormItem
        { ...formItemConfig }
        key={i}
        row={parseInt(i / rowLength, 10) + 1}
        span={getGrid(span)}
        label={label}
        labelClassName="font-size-16"
        { ...data.formItemProps } >
        {props.form.getFieldDecorator(data.name, data.options || {})(
          inputBox(data.type, data.inputProps)
        )}
      </FormItem>
    );
  }
  return formItemDom;
};
