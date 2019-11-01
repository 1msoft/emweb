import _ from 'lodash';
import React from 'react';
import { Modal } from 'antd';
import { useObserver } from "mobx-react-lite";
import { toJS } from "mobx";
import { Form, Input } from "@1msoft/kant-ui";
import less from './Operate.module.less';
import { useStore } from '../store';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;

let UpdateUser = (props) => useObserver( () => {
  const store = useStore();

  const handleCancel = () => {
    store.modal.close("updateUser");
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
      values.id = store.modal.modalList["updateUser"].data.uuid;
      store.setParams({ ...values });
      store.updateUser(handleCancel);
    } );
  };

  const initDate = store.modal.modalList["updateUser"] && store.modal.modalList["updateUser"].data || {};

  return (
    <div>
      <Modal
        width="40%"
        title={'修改用户'}
        visible={!!store.modal.modalList["updateUser"]}
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
            {props.form.getFieldDecorator("account", {
              initialValue: initDate.account,
            })(
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
            {props.form.getFieldDecorator("email", {
              initialValue: initDate.email,
            })(
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
            {props.form.getFieldDecorator("phone", {
              initialValue: initDate.phone,
            })(
              <Input/>
            )}
          </FormItem>
        </FormLayout>
      </Modal>
    </div>
  );
});

UpdateUser = Form.create({})(UpdateUser);

export default UpdateUser;
