import React from 'react';
import { useObserver } from "mobx-react-lite";

import { useStore } from '../store';
import {
  Dropdown,
  Menu,
  Icon,
  Alert,
  Badge,
} from 'antd';
import { Table, Button } from '@1msoft/kant-ui';

const STATUS_DESC = {
  close: '关闭',
  runing: '运行中',
  online: '已上线',
  error: '异常',
};
const STATUS_COLORS = {
  close: '#bebebe',
  runing: '#6840fe',
  online: '#00d576',
  error: '#ff0048',
};
const columns = [
  {
    title: '规则名称',
    dataIndex: 'rule',
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '服务调用次数',
    dataIndex: 'invokeNum',
    width: 100,
    sorter: (a, b) => a.invokeNum - b.invokeNum
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: text => <Badge color={STATUS_COLORS[text]} text={STATUS_DESC[text]} />
  },
  {
    title: '上次调用时间',
    dataIndex: 'lastInvokeTime',
  },
];

const Opeartions = (props) => useObserver(() => {
  const store = props.store;
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">删除</Menu.Item>
      <Menu.Item key="2">批量审批</Menu.Item>
    </Menu>
  );
  return (
    <div style={{ margin: '20px 0' }}>
      <Button
        type="primary"
        shape="round"
        onClick={() => {}}
        style={{ marginRight: '16px' }}
      >
        新建
      </Button>
      <Button
        shape="round"
        type="default"
        disabled={!store.selectedRow.length}
        onClick={() => {}}
        style={{ marginRight: '16px' }}
      >
        批量操作
      </Button>
      <Dropdown
        overlay={menu}
        disabled={!store.selectedRow.length}
        onClick={() => {}}
        style={{ marginRight: '16px' }}
      >
        <Button
          shape="round"
        >
          更多操作 <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
});

const AlertComponent = (props) => useObserver(() => {
  const store = props.store;
  return (
    <Alert
      type="info"
      showIcon={true}
      closable={true}
      style={{
        marginBottom: "10px",
        borderColor: "#B2C7FFFF",
        backgroundColor: "#ECF1FFFF"
      }}
      icon={<Icon type="info-circle" />}
      message={
        <span>
          已选择
          <span style={{ color: "#4576FDFF", margin: '0 10px' }}>
            {store.selectedRow.length}
          </span>
          项
        </span>
      }
    />
  );
});

export default () => useObserver(() => {
  const store = useStore();
  const rowSelection = {
    type: 'checkbox',
    getCheckboxProps: record => ({ disabled: record.status === 'error' }),
    selectedRowKeys: store.selectedRow,
    onChange: (selectedRowKeys) => store.setProperty('selectedRow', selectedRowKeys)
  };
  console.log(store);
  return (
    <div>

      <Opeartions store={store}/>

      <AlertComponent store={store} />

      <Table
        bordered
        resizable={true}
        columns={columns}
        dataSource={store.data}
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
      />
    </div>
  );
});
