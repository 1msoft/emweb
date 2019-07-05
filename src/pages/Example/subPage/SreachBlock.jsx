import React, { useState, useCallback, useMemo } from "react";
import { Form, Button } from "@1msoft/kant-ui";
import { Icon } from 'antd';
import { renderFormItems } from '@utils/formHelper';
import { useStore } from '../store';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;

const useStateHook = (props, store) => {
  const [isSingle, setIsSingle] = useState(true);
  
  const formItemDataSource = [
    {
      title: '成员姓名', name: 'name', type: 'input',
      formItemProps: { labelWidth: '100px' }
    },
    {
      title: '所属部门', name: 'type', type: 'select',
      inputProps: { 
        data: [
          { title: '交通部', value: 'jt' },
          { title: '社区', value: 'sh' }
        ],
        allowClear: true,
      },
    },
    { title: '相关描述', name: 'desc', type: 'input' },
    { title: '浏览时间', name: 'time', type: 'ant-date-picker' },
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

  const onSearch = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        store.setParams({ ...values });
        store.getList();
      }
    });
  };

  return {
    isSingle,
    openIconType,
    onToggle,
    onReset,
    dataSource,
    onSearch,
  };
};

let SreachBlock = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
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