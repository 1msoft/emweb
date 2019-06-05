import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { observer } from 'mobx-react';
import { Divider, DatePicker, Button, Icon } from "antd";
import { useStore } from '../store';
import { roleType } from '../mock';
import { Form, InputNumber, Input, Select } from "@1msoft/kant-ui";
import less from './SearchBlock.module.less';

const { FormLayout, FormItem } = Form;
const TextArea = Input.TextArea;
const getGrid = FormItem.getGrid;

/**
 * @constant
 * 搜索栏总行数
 */
const SEARCH_ROW_NUM = 2;

const useStateHook = (props, store) => {

  const [isSingle, setIsSingle] = useState(true);

  // 查询事件处理函数
  const onSearch = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        store.setParams({ ...values });
        store.getList();
      }
    });
  };

  // 重置事件函数
  const onReset = (e) => {
    props.form.resetFields();
  };

  // 展开图标计算
  const openIconType = useMemo(() => (isSingle ? 'down' : 'up'), [isSingle]);

  // 切换（展开/收缩） 事件
  const onToggle = useCallback(() => {
    setIsSingle(!isSingle);
  }, [isSingle]);

  return { onSearch, onReset, isSingle, openIconType, onToggle };
};

// 获取更多查询块
let getMoreQueryItems = (props) => {
  return ([
    <FormItem key={1} row={2} span={getGrid(6)} label="地址">
      {props.form.getFieldDecorator("address")(
        <Input placeholder="地址" />
      )}
    </FormItem>,
    <FormItem key={2} row={2} span={getGrid(6)} label="创建人">
      {props.form.getFieldDecorator("createAt")(
        <Input placeholder="创建人" />
      )}
    </FormItem>,
    <FormItem key={3} row={2} span={getGrid(6)} label="创建人">
      {props.form.getFieldDecorator("createTime")(
        <DatePicker style={{ width: '100%' }}/>
      )}
    </FormItem>
  ]);
};

let SearchBlock = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div className="container-query-block">
      <FormLayout colon={true}>
        <FormItem row={1} span={getGrid(6)} label="类型">
          {props.form.getFieldDecorator("type")(
            <Select data={roleType} placeholder="角色类型" style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem row={1} span={getGrid(6)} label="姓名">
          {props.form.getFieldDecorator("name")(
            <Input placeholder="姓名" />
          )}
        </FormItem>
        <FormItem row={1} span={getGrid(6)} label="年龄">
          {props.form.getFieldDecorator("age")(
            <InputNumber style={{ width: '100%' }} placeholder="年龄" />
          )}
        </FormItem>
        {!state.isSingle && getMoreQueryItems(props)}
        <FormItem
          push={0}
          span={getGrid(6)}
          wrapperAlign="right"
          row={state.isSingle ? 1 : SEARCH_ROW_NUM}
        >
          <Button
            shape="round"
            type="primary"
            onClick={state.onSearch}
            className={less['btn-search']}
          >
            查询
          </Button>
          <Button
            shape="round"
            onClick={state.onReset}
            className={less['btn-search']}
          >
            重置
          </Button>
          <Icon
            type={state.openIconType}
            onClick={state.onToggle}
            className={less[`btn-icon-${state.openIconType}`]}/>
        </FormItem>
      </FormLayout>
    </div>
  );
};

SearchBlock = Form.create({})(SearchBlock);

export default SearchBlock;
