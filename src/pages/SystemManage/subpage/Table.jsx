import React, { Fragment, useCallback } from 'react';
import { useObserver } from "mobx-react-lite";

import { useStore } from '../store';
import { Table, Button } from '@1msoft/kant-ui';
import { initPhone } from '@utils/utils.js';
import { Popconfirm, message } from 'antd';

const columns = (store) => [
  {
    title: '应用名称',
    dataIndex: 'appName',
    width: 100,
  },
  {
    title: '秘钥',
    dataIndex: 'secret',
    width: 100,
  },
  {
    title: 'redirect_url',
    dataIndex: '重定向地址',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => <Fragment>
      <span onClick={ () => { store.modal.open({ code: "updateUser", data: record }); } }>
        {"修改"}
      </span>
      <span> | </span>
      <Popconfirm
        title="你确定要进行删除操作吗?"
        onConfirm={() => {store.setParams({ id: record.uuid }); store.deleteUser();}}
        onCancel={() => {message.error('取消删除');}}
        okText="是"
        cancelText="否"
      >
        <span>
          {"删除"}
        </span>
      </Popconfirm>
      <span> | </span>
      <span onClick= { () => { store.modal.open({ code: "more", data: record }); } }>
        {"更多操作"}
      </span>
    </Fragment>
  }
];

const Opeartions = (props) => useObserver(() => {
  const store = props.store;
  return (
    <div style={{ margin: '20px 0' }}>
      <Button
        type="primary"
        shape="round"
        onClick={() => {
          store.modal.open({ code: "createUser" });
        }}
        style={{ marginRight: '16px' }}
      >
        新建
      </Button>
    </div>
  );
});

export default () => useObserver(() => {
  const store = useStore();

  return (
    <div>
      <Opeartions store={store}/>

      <Table
        bordered
        resizable={true}
        columns={columns(store)}
        dataSource={store.useInfo}
        rowKey={(record) => record._id}
      />
    </div>
  );
});
