import React, { useState } from 'react';
import { Form, Button } from '@1msoft/kant-ui';

import PageTitle from '@components/page-title';
import Skeleton from './subpage/Skeleton';
import InputForm from './subpage/InputForm';
import TextAreaForm from './subpage/TextAreaForm';
import DatePickerForm from './subpage/DatePickerForm';
import SelectForm from './subpage/SelectForm';
import InputNumberForm from './subpage/InputNumberForm';
import CheckboxForm from './subpage/CheckboxForm';

const useHookState = (props) => {
  const dataSource = [
    { title: '常见输入框', content: <InputForm {...props} /> },
    { title: '文本输入框', content: <TextAreaForm {...props} /> },
    { title: '日期时间选择框', content: <DatePickerForm {...props} /> },
    { title: '下拉选择框', content: <SelectForm {...props} /> },
    { title: '数字输入框', content: <InputNumberForm {...props} /> },
    { title: '选择控件', content: <CheckboxForm {...props} /> },
    { title: '按钮' },
  ];
  return { dataSource };
};

let BasisForm = (props) => {
  const state = useHookState(props);
  return (
    <div>
      <PageTitle
        title="基础表单"
        intro="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。" />
      <Skeleton dataSource={state.dataSource} />
      <div style={{ textAlign: 'center' }}>
        <Button
          shape="round"
          type="primary"
          className='btn-search'>
          提交
        </Button>
        <Button
          shape="round"
          className='btn-reset'>
          重置
        </Button>
      </div>
    </div>
  );
};

BasisForm = Form.create({ name: 'basisForm' })(BasisForm);

export default BasisForm;
