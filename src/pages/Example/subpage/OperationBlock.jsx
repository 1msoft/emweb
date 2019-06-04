import React from 'react';
import { Input, Button, Divider } from "antd";
import { observer, inject } from 'mobx-react';

import { useStore } from '../store';

const MODAL_CODE = 'editExample';

const useStateHook = (props) => {
  const store = useStore();

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
  return { add };
};

let OperationBlock = (props) => {
  const state = useStateHook(props);
  return (
    <div className="clearfix">
      <Button className="right" type="primary" onClick={state.add}>添加</Button>
    </div>
  );
};

export default OperationBlock;
