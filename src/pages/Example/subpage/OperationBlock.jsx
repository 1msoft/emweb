import React from 'react';
import { Input, Button, Divider, Modal, message } from "antd";
import { observer, inject } from 'mobx-react';

import { useStore } from '../store';

const MODAL_CODE = 'editExample';
const confirm = Modal.confirm;

const useStateHook = (props, store) => {
  /**
   * 添加数据处理函数
   * - 打开弹窗， 并设置弹窗信息
   */
  const add = () => {
    store.modal.open({
      code: MODAL_CODE,
      title: '新增数据',
    });
  };

  // 批量删除
  const deletes = () => {
    const ids = store.selectList.toJS();
    if (ids < 1){
      message.error('请先进行选择！');
      return false;
    }
    const onOk = () => {
      store.deletes({ ids: store.selectList.toJS() });
    };
    confirm({
      onOk,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      title: '确定批量删除数据？',
    });
  };

  return { add, deletes };
};

let OperationBlock = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div className="clearfix">
      <Button shape="round" className="left" type="primary" onClick={state.add}>新建</Button>
      <Button shape="round" className="left" onClick={state.deletes}>批量删除</Button>
    </div>
  );
};

export default OperationBlock;
