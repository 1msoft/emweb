import React, { useEffect } from 'react';
import { Table, Button } from "@1msoft/kant-ui";
import { Alert, Dropdown, Menu, Icon } from 'antd';
import { useObserver } from "mobx-react-lite";
import moment from 'moment';

import { useStore } from '../store';
import './TableList.less';

const MODAL_CODE_ADD = 'addExample';

const columns = [
  { title: '成员姓名', dataIndex: 'name' },
  { title: '相关描述', dataIndex: 'desc' },
  { title: '浏览次数', dataIndex: 'count' },
  {
    title: '状态', dataIndex: 'status',
    render: (text) => {
      let backgroundColor = '';
      let val = '';
      switch (text) {
        case 1:
          val = '关闭';
          backgroundColor = "#b7b7b7";
          break;
        case 2:
          val = '运行中';
          backgroundColor = "#3c6bfd";
          break;
        case 3:
          val = '异常';
          backgroundColor = "red";
          break;
        case 4:
          val = '已上线';
          backgroundColor = "#41bb6a";
          break;
        default: break;
      }
      return (
        <div className="point-layout">
          <span className="point" style={{ backgroundColor }}></span>
          { val }
        </div>
      );
    }
  },
  {
    title: '浏览时间', dataIndex: 'time',
    render: (text) => {
      const val = text && moment(text).format('YYYY-MM-DD hh:mm:ss');
      return <span>{ val }</span>;
    }
  },
  {
    title: '操作', dataIndex: 'operation',
    render: () => {
      return (
        <div>
          <span className="operation">配置</span>
          <span className="compartment"> | </span>
          <span className="operation">订阅报警</span>
        </div>
      );
    }
  },
];

const onDelete = () => {};

const useStateHook = (props, store) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onDelete}>
        删除
      </Menu.Item>
    </Menu>
  );

  const rowSelection = {
    selectedRowKeys: store.selectList,
    onChange: (keys, records) => {
      store.setSelectList(keys);
    },
  };

  const onClear = () => {
    store.selectList = [];
  };

  const add = () => {
    store.modal.open({
      code: MODAL_CODE_ADD,
      title: '新增数据',
    });
  };

  return { menu, rowSelection, onClear, add };
};

const TableList = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  const selectList = store.selectList;
  return (
    <div>
      <div style={{ margin: '30px 0 20px 0' }}>
        <Button
          shape="round"
          type="primary"
          className='btn-search'
          onClick={state.add}>
          新建
        </Button>
        <Button
          disabled={!selectList.length}
          shape="round"
          type="primary"
          className={`btn-batch-operation ${!selectList.length ? 'btn-disabled' : 'btn-start'}`}>
          批量操作
        </Button>
        <Dropdown
          disabled={!selectList.length}
          overlay={state.menu}
          overlayClassName={'dropdown-menu'}>
          <Button
            disabled
            shape="round"
            type="primary"
            className={`btn-more-operation ${!selectList.length ? 'btn-disabled' : 'btn-start'}`}>
            更多操作
            <Icon type="down" />
          </Button>
        </Dropdown>
        
      </div>
      <Alert
        style={{ marginBottom: 20 }}
        className="table-alert"
        message={
          <span>
            <span className="iconfont iconyonghu-yijian table-warning" />
            已选择
            <span style={{ color: '#4576FD' }}>{` ${selectList.length} `}</span>
            项
            <span className={'close-wrapper'} onClick={state.onClear}>
              <i className={'iconfont iconyingyongguanbi close'}></i>
            </span>
          </span>} />
      <Table
        bordered
        className="table-thead-center"
        columns={columns}
        dataSource={store.list.toJS()}
        rowSelection={state.rowSelection}
        rowKey={(record, index) => index} />
    </div>
  );
});

export default TableList;
