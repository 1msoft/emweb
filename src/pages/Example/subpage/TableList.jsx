import _ from 'lodash';
import moment from 'moment';
import React, {
  useMemo, Fragment, useCallback, useEffect
} from 'react';
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
  }, []);

  // 表格分页 change 事件
  const onChange = (page, pageSize) => {
    store.setPage({ current: page });
    store.getList();
  };

  // 取消事件处理函数
  const onDelete = (record) => {
    const id = record.key;
    store.delete({ id });
  };

  /**
   * 编辑处理函数： 打开编辑弹窗
   * @param {Object} record 当前编辑的数据
   */
  const onEdit = (record) => {
    store.modal.open({
      code: MODAL_CODE,
      title: '编辑数据',
      data: record,
    });
    console.log('编辑', record);
  };

  /**
   * 表格操作字段 render 函数
   */
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

  return { operation, onChange };
};

let TableList = (props) => useObserver(() => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div>
      <Table
        dataSource={store.list.toJS()}
        pagination={{
          showQuickJumper: true,
          total: store.page.total,
          onChange: state.onChange,
          defaultCurrent: store.page.current,
        }}
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
