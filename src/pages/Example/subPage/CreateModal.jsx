import React, { useMemo } from 'react';
import { Modal } from 'antd';
import { useObserver } from "mobx-react-lite";
import { Form, Input } from "@1msoft/kant-ui";
import { useStore } from '../store';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;
const MODAL_CODE = 'addExample';

const useStateHook = (props, store) => {
  // 获取 modal 相关数据
  const modal = useMemo(() => (
    store.modal.modalList[MODAL_CODE] || {}
  ));

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
      if (!err) {
        add({ values });
        handleCancel();
      }
    });
  };

  return { modal, handleOk, handleCancel };
};

let CreateBlock = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <Modal
      width="500px"
      title={state.modal.title}
      visible={!!state.modal.code}
      onOk={state.handleOk}
      onCancel={state.handleCancel}>
      <FormLayout colon={true}>
        <FormItem row={1} span={getGrid(24)} label="成员姓名">
          {props.form.getFieldDecorator("name", {
            rules: [{ required: true, message: "成员姓名必填" }]
          })(
            <Input placeholder="成员姓名" />
          )}
        </FormItem>
        <FormItem row={2} span={getGrid(24)} label="相关描述">
          {props.form.getFieldDecorator("desc")(
            <Input placeholder="相关描述" />
          )}
        </FormItem>
      </FormLayout>
    </Modal>
  );
});

CreateBlock = Form.create({})(CreateBlock);

export default CreateBlock;