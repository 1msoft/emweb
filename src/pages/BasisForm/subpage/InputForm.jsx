import React from 'react';
import { Form } from '@1msoft/kant-ui';
import { renderFormItems } from '@utils/formHelper';

const { FormLayout } = Form;

const useHookState = (props) => {
  const dataSource = [
    {
      title: '标题', name: 'title1', type: 'input',
      inputProps: {
        placeholder: '请输入标题内容',
      },
      formItemProps: {
        required: true
      },
      options: {
        rules: [
          { required: true, message: '请输入标题内容' }
        ]
      }
    },
    {
      title: '标题', name: 'title2', type: 'input',
      inputProps: {
        placeholder: '请输入标题内容',
      },
    },
    {
      title: '标题', name: 'title3', type: 'input',
      formItemProps: {
        validateStatus: 'success',
        hasFeedback: true,
        required: true
      },
      options: {
        initialValue: '我在菜市场买菜',
        rules: [{ required: true, message: '请输入标题内容' }]
      },
    },
    {
      title: '标题', name: 'title4', type: 'input',
      formItemProps: {
        validateStatus: 'validating',
        hasFeedback: true,
        required: true
      },
      options: {
        initialValue: '我在菜市场买菜',
        rules: [{ required: true, message: '请输入标题内容' }]
      }
    },
    {
      title: '标题', name: 'title5', type: 'input',
      inputProps: {
        placeholder: '请输入标题内容',
      },
      formItemProps: {
        validateStatus: 'error',
        hasFeedback: true,
        required: true
      },
      options: {
        rules: [
          { required: true, message: '请输入标题内容' }
        ]
      }
    },
    {
      title: '标题', name: 'title6', type: 'input',
      formItemProps: {
        validateStatus: 'error',
        hasFeedback: true,
        required: true
      },
      options: {
        initialValue: '我在菜市场买菜',
        rules: [{ required: true, message: '请输入标题内容' }]
      }
    },
    {
      title: '标题', name: 'title7', type: 'input',
      inputProps: {
        placeholder: '请输入标题内容',
      },
      formItemProps: {
        validateStatus: 'warning',
        hasFeedback: true,
        required: true
      },
      options: {
        rules: [
          { required: true, message: '请输入标题内容' }
        ]
      }
    },
    {
      title: '标题', name: 'title8', type: 'input',
      formItemProps: {
        validateStatus: 'warning',
        hasFeedback: true,
        required: true
      },
      options: {
        initialValue: '基础表单',
        rules: [{ required: true, message: '请输入标题内容' }]
      }
    },
  ];

  return { dataSource };
};

const InputForm = (props) => {
  const state = useHookState(props);
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      {renderFormItems(state.dataSource, props, props.config)}
    </div>
  );
};

export default InputForm;
