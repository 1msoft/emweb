import {
  Menu,
  Icon,
  Input,
  Modal,
  Button,
  Divider,
  message,
  Dropdown,
} from "antd";
import React from 'react';
import { observer, inject } from 'mobx-react';
import { useObserver } from "mobx-react-lite";

import less from './OperationBlock.module.less';
import { useStore } from '../store';

const MODAL_CODE = 'editExample';
const confirm = Modal.confirm;

const useStateHook = (props, store) => {

  // 清除
  const onClear = () => {
    store.clearSelectList();
  };

  // 添加数据: 打开弹窗， 并设置弹窗信息
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

  // 更多操作：下拉项
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={deletes}>
        删除
      </Menu.Item>
    </Menu>
  );

  return { add, deletes, onClear, menu };
};

let OperationBlock = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div>
      <div className={`clearfix ${less['operation']}`}>
        <Button
          type="primary"
          shape="round"
          className="left"
          onClick={state.add}
        >
            新建
        </Button>
        <Button
          shape="round"
          onClick={state.deletes}
          className={`left ${less['btn-batch']}`}
        >
          批量删除
        </Button>
        <Dropdown overlay={state.menu} overlayClassName={less['dropdown-menu']}>
          <Button shape="round"  className={less['dropdown']}>
            更多操作
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
      <div className={less['statistics']}>
        <i className={`iconfont iconyonghu-bangzhu ${less['bangzhu']}`}></i>
        已选择<span className={less['select-num']}>{store.selectList.length}</span>项
        <span className={less['close-wrapper']} onClick={state.onClear}>
          <i className={`iconfont iconyingyongguanbi ${less['close']}`}></i>
        </span>
      </div>
    </div>
  );
});

export default OperationBlock;
