import React from 'react';
import { Form } from '@1msoft/kant-ui';
import { renderFormItems } from '@utils/formHelper';

import moment from 'moment';

const { FormLayout, FormItem } = Form;

const useHookState = (props) => {
  const dataSource = [
    { title: '起止日期', name: 'date1', type: 'date-picker' },
    { title: '起止日期', name: 'date2', type: 'date-picker' },
    {
      title: '起止日期', name: 'date3', type: 'date-picker',
      formItemProps: {
        validateStatus: 'error',
        hasFeedback: true,
      },
      options: {
        rules: [
          { required: true, message: '请选择起止日期' }
        ]
      }
    },
    {
      title: '日期', name: 'date4', type: 'ant-date-picker',
      inputProps: {
        style: { maxWidth: 250, width: '100%' }
      },
      options: {
        initialValue: moment('2019-05-22', 'YYYY-MM-DD')
      }
    },
    {
      title: '日期时间', name: 'date5', type: 'ant-date-picker',
      inputProps: {
        style: { maxWidth: 250, width: '100%' },
        showTime: true
      },
      options: {
        initialValue: moment('2019-05-22 16:40:55', 'YYYY-MM-DD hh:mm:ss')
      }
    },
    {
      title: '月份', name: 'date6', type: 'ant-month-picker',
      inputProps: {
        style: { maxWidth: 250, width: '100%' }
      },
      options: {
        initialValue: moment('2019-05-22', 'YYYY-MM-DD')
      }
    },
    {
      title: '时间', name: 'date7', type: 'ant-time-picker',
      inputProps: {
        style: { maxWidth: 250, width: '100%' }
      },
      options: {
        initialValue: moment('16:40:55', 'HH:mm:ss')
      }
    },
  ];
  return { dataSource };
};

const DatePickerForm = (props) => {
  const state = useHookState(props);
  return (
    <div className="basis-form">
      {renderFormItems(state.dataSource, props, props.config)}
    </div>
  );
};

export default DatePickerForm;
