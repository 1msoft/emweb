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
  const config = {
    rowLength: 1,
    span: 24,
  };
  return (
    <div className="input-number-form" style={{ width: '50%', margin: '0 auto' }}>
      <FormLayout
        colon={true}>
        {renderFormItems(state.dataSource, props, config)}
      </FormLayout>
    </div>
  );
};

export default InputNumberForm;
