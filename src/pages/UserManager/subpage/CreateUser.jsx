import _ from 'lodash';
import React from 'react';
import { Modal } from 'antd';
import { useObserver } from "mobx-react-lite";
import { Form, Input } from "@1msoft/kant-ui";
import less from './Operate.module.less';
import { useStore } from '../store';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;

let CreateUser = (props) => useObserver( () => {
  const store = useStore();

  const handleCancel = () => {
    store.modal.close("createUser");
    props.form.resetFields();
  };

  const handleOk = () => {
    const validateFields = props.form.validateFields;
    validateFields( (errors, values) => {
      for (let v in values) {
        if (values[v] === undefined) {
          delete values[v];
        }
      }
      store.setParams({ ...values });
      store.createUser(handleCancel);
    } );
  };
  return (
    <div>
      <Modal
        width="40%"
        title={'新建用户'}
        visible={!!store.modal.modalList["createUser"]}
        onOk = { handleOk }
        onCancel={handleCancel}
      >
        <FormLayout colon={true} direction="column">
          <FormItem
            row={1}
            inlineLabel
            span={getGrid(8)}
            required
            label="账户号 account"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("account")(
              <Input/>
            )}
          </FormItem>
          <FormItem
            row={1}
            inlineLabel
            span={getGrid(8)}
            required
            label="邮箱 email"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("email")(
              <Input/>
            )}
          </FormItem>
          <FormItem
            row={1}
            inlineLabel
            span={getGrid(8)}
            required
            label="手机号 phone"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("phone")(
              <Input/>
            )}
          </FormItem>
          <FormItem
            row={2}
            inlineLabel
            span={getGrid(8)}
            required
            label="密码 password"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("password")(
              <Input/>
            )}
          </FormItem>
        </FormLayout>
      </Modal>
    </div>
  );
});

CreateUser = Form.create({})(CreateUser);

export default CreateUser;
