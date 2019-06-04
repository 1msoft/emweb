import _ from 'lodash';
import React, { useMemo } from 'react';
import { Modal, Button, Divider, DatePicker } from 'antd';
import { useObserver } from "mobx-react-lite";
import { Form, InputNumber, Input, Select } from "@1msoft/kant-ui";

import { useStore } from '../store';
import { roleType } from '../mock';

const { FormLayout, FormItem } = Form;
const TextArea = Input.TextArea;
const getGrid = FormItem.getGrid;
const MODAL_CODE = 'editExample';

const useStateHook = (props, store) => {
  // 获取 modal 相关数据
  const modal = useMemo(() => (
    store.modal.modalList[MODAL_CODE] || {}
  ));

  // 编辑处理函数
  const edit = ({ values }) => {
    const id = modal.data.key;
    store.edit({ values, id });
  };

  // 添加数据处理函数
  const add = ({ values }) => {
    store.add({ values });
  };

  // 弹窗取消事件
  const handleCancel = () => {
    store.modal.close(MODAL_CODE);
    props.form.resetFields();
  };

  // 弹窗确认事件
  const handleOk = () => {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        modal.data ? edit({ values }) : add({ values });
        handleCancel();
      }
    });
  };

  return { modal, handleOk, handleCancel };
};

let EditBlock = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div>
      <p>{store.list.name}</p>
      <p>{state.modal.code}</p>
      <Modal
        width="50%"
        title={state.modal.title}
        visible={!!state.modal.code}
        onOk={state.handleOk}
        onCancel={state.handleCancel}
      >
        <FormLayout colon={true} inlineLabel={true}>
          <FormItem row={1} span={getGrid(12)} label="类型">
            {props.form.getFieldDecorator("type", {
              rules: [{ required: true, message: "类型必填" }],
              initialValue: state.modal.data ? state.modal.data.type : void 0,
            })(
              <Select data={roleType} placeholder="角色类型" style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem row={1} span={getGrid(12)} label="姓名">
            {props.form.getFieldDecorator("name", {
              rules: [{ required: true, message: "姓名必填" }],
              initialValue: state.modal.data ? state.modal.data.name : void 0,
            })(
              <Input placeholder="姓名" />
            )}
          </FormItem>
          <FormItem row={2} span={getGrid(12)} label="年龄">
            {props.form.getFieldDecorator("age", {
              initialValue: state.modal.data ? state.modal.data.age : void 0,
            })(
              <InputNumber style={{ width: '100%' }} placeholder="年龄" />
            )}
          </FormItem>
          <FormItem row={2} span={getGrid(12)} label="地址">
            {props.form.getFieldDecorator("address", {
              initialValue: state.modal.data ? state.modal.data.address : void 0,
            })(
              <Input placeholder="地址" />
            )}
          </FormItem>
          <FormItem row={3} span={getGrid(12)} label="创建人">
            {props.form.getFieldDecorator("createAt", {
              initialValue: state.modal.data ? state.modal.data.createAt : void 0,
            })(
              <Input placeholder="创建人" />
            )}
          </FormItem>
          <FormItem row={3} span={getGrid(12)} label="创建时间">
            {props.form.getFieldDecorator("createTime", {
              initialValue: state.modal.data ? state.modal.data.createTime : void 0,
            })(
              <DatePicker style={{ width: '100%' }}/>
            )}
          </FormItem>
        </FormLayout>
      </Modal>
    </div>
  );
});

EditBlock = Form.create({})(EditBlock);

export default EditBlock;
