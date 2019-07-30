import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Icon } from "antd";
import {
  Form,
  InputNumber,
  Input,
  Button,
  DatePicker,
  Select,
} from "@1msoft/kant-ui";
import useMedia from 'react-media-hook2';
import less from '../index.module.less';

const { FormLayout, FormItem } = Form;

/**
 * @constant
 * 搜索栏总行数
 */
const SEARCH_ROW_NUM = 2;
const span = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 6,
};

const useStateHook = () => {

  const [isSingle, setIsSingle] = useState(true);

  const onSearch = () => {};

  const onReset = () => {};

  const openIconType = useMemo(() => (isSingle ? 'down' : 'up'), [isSingle]);

  const onToggle = useCallback(() => {
    setIsSingle(!isSingle);
  }, [isSingle]);

  const screenMd = useMedia({
    query: {
      minWidth: 768,
      maxWidth: 991,
    }
  })[0];
  return { onSearch, onReset, isSingle, openIconType, onToggle, screenMd };
};

const AdvancedSearch = (props) => {
  const currRow = (props.isSingle || props.screenMd) ? 1 : SEARCH_ROW_NUM;
  return (
    [
      <FormItem key={1} row={currRow} span={span} label="地址">
        <Input placeholder="地址" />
      </FormItem>,
      <FormItem key={2} row={currRow} span={span} label="创建人">
        <Input placeholder="创建人" />
      </FormItem>,
      <FormItem key={3} row={currRow} span={span} label="日期">
        <DatePicker style={{ width: 'calc(50% - 9.5px)' }}/>
      </FormItem>
    ]
  );
};

let QueryBlock = (props) => {
  const state = useStateHook(props);
  const selectOps = [
    { title: '红色', value: 'red' },
    { title: '橙色', value: 'orange' },
    { title: '黄色', value: 'yellow' },
  ];
  return (
    <div className="container-query-block">
      <FormLayout colon={true} gutter={0}>
        <FormItem row={1} span={span} label="颜色">
          <Select
            data={selectOps}
            placeholder="请选择颜色"
            style={{ width: '100%' }}
          />
        </FormItem>
        <FormItem row={1} span={span} label="字典">
          <Input placeholder="字典" />
        </FormItem>
        <FormItem row={1} span={span} label="年龄">
          <InputNumber style={{ width: '100%' }} placeholder="年龄" />
        </FormItem>
        {!state.isSingle && AdvancedSearch(state)}
        <FormItem
          span={{
            xs: 24,
            sm: 24,
            md: (state.isSingle && state.screenMd) ? 12 : 24,
            lg: 6,
          }}
          wrapperAlign="right"
          row={state.isSingle ? 1 : 2}
        >
          <Button
            shape="round"
            type="primary"
            className={less["btn-search"]}
            onClick={state.onSearch}
          >
            查询
          </Button>
          <Button
            shape="round"
            type="default"
            className={less["btn-reset"]}
            onClick={state.onReset}
          >
            重置
          </Button>
          <Icon
            type={state.openIconType}
            onClick={state.onToggle}
            className={less[`btn-icon-${state.openIconType}`]}
          />
        </FormItem>
      </FormLayout>
    </div>
  );
};

export default QueryBlock;
