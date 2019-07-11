import React from 'react';
import { Form } from '@1msoft/kant-ui';
import { renderFormItems } from '@utils/formHelper';

const { FormLayout, FormItem } = Form;
const options = [
  { title: '基础表单', value: 'form1' },
  { title: '分步表单', value: 'form2' }
];

const useHookState = (props) => {
  const dataSource = [
    {
      title: '客户', name: 'client', type: 'select',
      inputProps: {
        placeholder: '请描述你的服务客户',
      },
    },
    {
      title: '标题', name: 'client2', type: 'select',
      inputProps: {
        placeholder: '请描述你的服务客户',
        data: options,
        allowClear: true,
      },
      options: {
        initialValue: 'form1',
        rules: [{ required: true, message: '请输入标题内容' }]
      },
      formItemProps: {
        required: true
      },
    },
    {
      title: '标题', name: 'client3', type: 'select',
      inputProps: {
        placeholder: '请描述你的服务客户',
        data: options,
        allowClear: true,
      },
      options: {
        initialValue: 'form1',
        rules: [{ required: true, message: '请输入标题内容' }]
      },
      formItemProps: {
        validateStatus: 'error',
        hasFeedback: true,
        required: true
      },
    }
  ];
  return { dataSource };
};

const SelectForm = (props) => {
  const state = useHookState(props);
  const config = {
    rowLength: 1,
    span: 24,
  };
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      {renderFormItems(state.dataSource, props, props.config)}
    </div>
  );
};

export default SelectForm;
