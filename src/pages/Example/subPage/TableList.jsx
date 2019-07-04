import React from 'react';
import { Table, Button } from "@1msoft/kant-ui";
import { Alert, Dropdown, Menu, Icon } from 'antd';

import './TableList.less';

const { Column } = Table;

const columns = [
  { title: '规则名称', dataIndex: 'name' },
  { title: '描述', dataIndex: 'desc' },
  { title: '服务调用次数', dataIndex: 'count' },
  { title: '状态', dataIndex: 'status' },
  { title: '上次调用时间', dataIndex: 'time' },
  { title: '操作', dataIndex: 'operation' },
];

const onDelete = () => {};

const useStateHook = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onDelete}>
        删除
      </Menu.Item>
    </Menu>
  );

  const rowSelection = {
    // selectedRowKeys: store.selectList,
  };

  return { menu, rowSelection };
};

const TableList = (props) => {
  const state = useStateHook(props);
  return (
    <div>
      <div style={{ margin: '30px 0 20px 0' }}>
        <Button
          shape="round"
          type="primary"
          className='btn-search'>
          新建
        </Button>
        <Button
          disabled
          shape="round"
          type="primary"
          className='btn-batch-operation'>
          批量操作
        </Button>
        <Dropdown
          disabled
          overlay={state.menu}
          overlayClassName={'dropdown-menu'}>
          <Button
            disabled
            shape="round"
            type="primary"
            className='btn-more-operation'>
            更多操作
            <Icon type="down" />
          </Button>
        </Dropdown>
        
      </div>
      <Alert
        style={{ marginBottom: 20 }}
        className="table-alert"
        message={<span>已选择 0 项 服务调用次数总计 0万</span>} />
      <Table
        className="table-thead-center"
        columns={columns}
        rowSelection={state.rowSelection} />
    </div>
  );
};

export default TableList;
