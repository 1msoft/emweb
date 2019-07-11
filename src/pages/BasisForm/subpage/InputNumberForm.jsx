import React from 'react';
import { Form } from '@1msoft/kant-ui';
import { renderFormItems } from '@utils/formHelper';

const { FormLayout } = Form;

const useHookState = (props) => {
  const dataSource = [
    {
      title: '客户', name: 'number1', type: 'input-number',
      inputProps: {
        style: { maxWidth: 110 },
        suffix: '%',
        placeholder: '请输入',
      },
      formItemProps: {}
    },
    {
      title: '客户', name: 'number2', type: 'input-number',
      inputProps: {
        controls: true,
        suffix: '%',
        placeholder: '请输入',
        style: { maxWidth: 110 }
      }
    }
  ];
  return { dataSource };
};

const InputNumberForm = (props) => {
  const state = useHookState(props);
  return (
    <div className="input-number-form" style={{ width: '50%', margin: '0 auto' }}>
      {renderFormItems(state.dataSource, props, props.config)}
    </div>
  );
};

export default InputNumberForm;
