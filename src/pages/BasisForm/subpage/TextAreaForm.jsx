import React from 'react';
import { Form } from '@1msoft/kant-ui';
import { renderFormItems } from '@utils/formHelper';

const { FormLayout, FormItem } = Form;
const text = '从不擅长吃你饭挖出那次之欧宝in偶从额为那你猜欢乐城那那边' +
  '是为别人把我擦卡了参大V是大V就是大V奥布包包是的 is咋混发' +
  '是为别人把我擦卡了参大V是大V就是大V奥布包包是的 is咋混发' +
  '是为别人把我擦卡了参大V是大V就是大V奥布包包是的 is咋混发' +
  '是为别人把我擦卡了参大V是大V就是大V奥布包包是的 is咋混发';

const useHookState = (props) => {
  const dataSource = [
    {
      title: '目标描述', name: 'desc1', type: 'text-area',
      inputProps: {
        placeholder: '请输入目标描述内容',
        style: { height: 88 }
      },
    },
    {
      title: '目标描述', name: 'desc2', type: 'text-area',
      inputProps: {
        placeholder: '请输入目标描述内容',
        style: { height: 88 }
      },
      formItemProps: {
        validateStatus: 'warning',
        hasFeedback: true,
        required: true,
        wrapperClassName: 'text-area-warning'
      },
      options: {
        rules: [
          { required: true, message: '请输入目标描述' }
        ]
      }
    },
    {
      title: '目标描述', name: 'desc3', type: 'text-area',
      inputProps: {
        placeholder: '请输入目标描述内容',
        style: { height: 88 }
      },
      options: {
        initialValue: text,
      }
    },
    {
      title: '目标描述', name: 'desc4', type: 'text-area',
      inputProps: {
        placeholder: '请输入目标描述内容',
        style: { height: 88 }
      },
      options: {
        initialValue: text,
      }
    },
    {
      title: '目标描述', name: 'desc5', type: 'text-area',
      inputProps: {
        placeholder: '请输入目标描述内容',
        style: { height: 88 }
      },
      options: {
        initialValue: text,
      }
    },
  ];
  return { dataSource };
};

const TextAreaForm = (props) => {
  const state = useHookState(props);
  return (
    <div className="basis-form">
      {renderFormItems(state.dataSource, props, props.config)}
    </div>
  );
};

export default TextAreaForm;
