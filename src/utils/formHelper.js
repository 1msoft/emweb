/**
 * 表单组件工具
 * @author kjx
 */
import React from 'react';
import { Form, Select, Input, DatePicker } from "@1msoft/kant-ui";
import { DatePicker as AntDatePicker } from 'antd';

const ROW_LENGTH = 3;
const SPAN_LENGTH = 6;
const { FormItem } = Form;
const getGrid = FormItem.getGrid;

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
    default:
      return;
  }
};

/**
 * 表单 FormItem 渲染
 */
export const renderFormItems = (dataSource, props, config = {}) => {
  const { rowLength = ROW_LENGTH, span = SPAN_LENGTH } = config;
  const formItemDom = [];
  for (let i = 0; i < dataSource.length; i++) {
    const data = dataSource[i];
    formItemDom.push(
      <FormItem
        key={i}
        row={parseInt(i / rowLength, 10) + 1}
        span={getGrid(span)}
        label={data.title}
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
