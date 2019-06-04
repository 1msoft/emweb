import React from 'react';
import { observer } from 'mobx-react';
import { Button, Divider, DatePicker } from "antd";
import { useStore } from '../store';
import { roleType } from '../mock';
import { Form, InputNumber, Input, Select } from "@1msoft/kant-ui";

const { FormLayout, FormItem } = Form;
const TextArea = Input.TextArea;
const getGrid = FormItem.getGrid;

const useStateHook = (props, store) => {

  // 查询事件处理函数
  const onSearch = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        store.setParams({ ...values });
        store.getList();
      }
    });
  };
  return { onSearch };
};

let SearchBlock = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <FormLayout colon={true} inlineLabel={true}>
      <FormItem row={1} span={getGrid(6)} label="类型">
        {props.form.getFieldDecorator("type")(
          <Select data={roleType} placeholder="角色类型" style={{ width: '100%' }} />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="姓名">
        {props.form.getFieldDecorator("name")(
          <Input placeholder="姓名" />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="年龄">
        {props.form.getFieldDecorator("age")(
          <InputNumber style={{ width: '100%' }} placeholder="年龄" />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="地址">
        {props.form.getFieldDecorator("address")(
          <Input placeholder="地址" />
        )}
      </FormItem>
      <FormItem row={2} span={getGrid(6)} label="创建人">
        {props.form.getFieldDecorator("createAt")(
          <Input placeholder="创建人" />
        )}
      </FormItem>
      <FormItem row={2} span={getGrid(6)} label="创建人">
        {props.form.getFieldDecorator("createTime")(
          <DatePicker style={{ width: '100%' }}/>
        )}
      </FormItem>
      <FormItem row={2} span={getGrid(6)} push={6} wrapperAlign="right">
        <Button type="primary" onClick={state.onSearch}> 查询 </Button>
      </FormItem>
    </FormLayout>
  );
};

SearchBlock = Form.create({})(SearchBlock);

export default SearchBlock;
