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

let UpdateApplication = (props) => useObserver( () => {
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
        title={'修改应用'}
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
            label="应用名称 appName"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("appName", {
              initialValue: initDate.appName,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            row={1}
            inlineLabel
            span={getGrid(8)}
            required
            label="秘钥 secret"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("secret", {
              initialValue: initDate.secret,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            row={1}
            inlineLabel
            span={getGrid(8)}
            required
            label="重定向地址 redirect_url"
            wrapperClassName={less['form-item']}
          >
            {props.form.getFieldDecorator("redirect_url", {
              initialValue: initDate.redirect_url,
            })(
              <Input/>
            )}
          </FormItem>
        </FormLayout>
      </Modal>
    </div>
  );
});

UpdateApplication = Form.create({})(UpdateApplication);

export default UpdateApplication;
