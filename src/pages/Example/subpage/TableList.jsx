import React, {
  useMemo,
  Fragment,
  useCallback,
  useEffect,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Table, Popconfirm } from 'antd';
import { useObserver } from "mobx-react-lite";
import { observer, inject } from 'mobx-react';

import { useStore } from '../store';
import { roleType } from '../mock';

const { Column, ColumnGroup } = Table;

const MODAL_CODE = 'editExample';

/**
 * 通用表格 render 处理函数
 * @param {String} type    自定义类型
 * @param {*}      text    当前匹配到数据
 * @param {Object} record  当条数据
 * @param {Number} index   索引
 */
const tableRender = (type, text, record, index) => {
  const map = {
    type: () => ((_.find(roleType, (value) => (value.value === text)) || {}).title),
    time: () => {
      if (!text){return '-';}
      return moment(text).format('YYYY-MM-DD');
    }
  };
  return (map[type] ? map[type]() : text);
};

const useStateHook = (props, store) => {

  useEffect(() => {
    store.getList();
    store.getData();
  }, []);

  // 表格分页 change 事件
  const onChange = (page, pageSize) => {
    store.clearSelectList();
    store.setPage({ current: page });
    store.getList();
  };

  // 取消事件处理函数
  const onDelete = (record) => {
    const ids = [record.key];
    store.deletes({ ids });
  };

  // 编辑处理函数： 打开编辑弹窗（record 当前编辑的数据）
  const onEdit = (record) => {
    store.modal.open({
      code: MODAL_CODE,
      title: '编辑数据',
      data: record,
    });
  };

  // 表格操作字段 render 函数
  const operation = useCallback((text, record) => {
    return (
      <Fragment>
        <span className="link" onClick={onEdit.bind(null, record)}>编辑</span>
        <span> | </span>
        <Popconfirm
          okText="是"
          cancelText="否"
          title="是否删除该条数据？"
          onConfirm={onDelete.bind(null, record)}>
          <span className="link-delete" >删除</span>
        </Popconfirm>
      </Fragment>
    );
  });

  // 可选表格配置
  const rowSelection = {
    selectedRowKeys: store.selectList,
    onChange: (keys, records) => {
      store.setSelectList(keys);
    },
    getCheckboxProps: record => ({
      // 设置选择框 props 属性
      disabled: record.name === '胡彦斌',
    }),
  };

  // 表格分页配置
  const pagination = {
    showQuickJumper: true,
    onChange: onChange,
    total: store.page.total,
    defaultCurrent: store.page.current,
  };

  return { operation, onChange, rowSelection, pagination };
};

let TableList = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div>
      <Table
        pagination={state.pagination}
        dataSource={store.list.toJS()}
        rowSelection={state.rowSelection}
      >
        <Column
          key="type"
          title="角色类型"
          dataIndex="type"
          render={tableRender.bind(null, 'type')}
        />
        <Column key="name" title="姓名" dataIndex="name"/>
        <Column title="年龄" dataIndex="age" key="age" />
        <Column title="住址" dataIndex="address" key="address" />
        <Column
          title="创建时间"
          key="createTime"
          dataIndex="createTime"
          render={tableRender.bind(null, 'time')}
        />
        <Column title="创建人" dataIndex="createAt" key="createAt" />
        <Column
          title="更新时间"
          key="updateTime"
          dataIndex="updateTime"
          render={tableRender.bind(null, 'time')}
        />
        <Column title="更新人" dataIndex="updateAt" key="updateAt" />
        <Column title="操作" key="operation" render={ state.operation } />
      </Table>
    </div>
  );
});

export default TableList;
