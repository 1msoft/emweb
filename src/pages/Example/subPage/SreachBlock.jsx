import React, { useState, useCallback, useMemo } from "react";
import { Form, Button } from "@1msoft/kant-ui";
import { Icon } from 'antd';
import { renderFormItems } from '@utils/formHelper';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;

const useStateHook = (props) => {
  const [isSingle, setIsSingle] = useState(true);
  
  const formItemDataSource = [
    { title: '规则名称', name: 'name', type: 'input' },
    {
      title: '规则类型', name: 'type', type: 'select',
      inputProps: { 
        data: [
          { title: '交通规则', value: 'jt' },
          { title: '社区规则', value: 'sh' }
        ],
        allowClear: true,
      },
    },
    { title: '规则描述', name: 'desc', type: 'input' },
    { title: '更新时间', name: 'time', type: 'ant-date-picker' },
    { title: '创建人员', name: 'createAt', type: 'input' },
    { title: '更新人员', name: 'updateAt', type: 'input' },
  ];

  const openIconType = useMemo(() => (isSingle ? 'up' : 'down'), [isSingle]);

  const onToggle = useCallback(() => {
    setIsSingle(!isSingle);
  }, [isSingle]);

  const onReset = (e) => {
    props.form.resetFields();
  };

  const dataSource = isSingle ? formItemDataSource : formItemDataSource.splice(0, 3);

  return {
    isSingle,
    openIconType,
    onToggle,
    onReset,
    dataSource,
  };
};

let SreachBlock = (props) => {
  const state = useStateHook(props);
  return (
    <div className="container-query-block">
      <FormLayout
        colon={true}
        inlineLabel>
        { renderFormItems(state.dataSource, props) }
        <FormItem
          span={getGrid(6)}
          row={state.isSingle ? 2 : 1}
        >
          <Button
            shape="round"
            type="primary"
            onClick={state.onSearch}
            className='btn-search'
          >
            查询
          </Button>
          <Button
            shape="round"
            onClick={state.onReset}
            className='btn-reset'
          >
            重置
          </Button>
          <Icon
            type={state.openIconType}
            onClick={state.onToggle}
            className={`btn-icon-${state.openIconType}`}/>
        </FormItem>
      </FormLayout>
    </div>
  );
};

SreachBlock = Form.create({})(SreachBlock);

export default SreachBlock;