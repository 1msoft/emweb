import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Icon } from "antd";
import {
  Form,
  Input,
  Button,
} from "@1msoft/kant-ui";
import useMedia from 'react-media-hook2';
import less from '../index.module.less';
import { useStore } from '../store';
import { toJS } from 'mobx';

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

const useStateHook = (props, store) => {

  const [isSingle, setIsSingle] = useState(true);

  const onSearch = () => {
    const values = props.form.getFieldsValue();
    for (let v in values) {
      if (values[v] === undefined) {
        delete values[v];
      }
    }
    store.setParams(values);
    store.getUsers();
  };

  const onReset = () => {
    props.form.resetFields();
  };

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

  useEffect(() => {
    onSearch();
  }, []);

  return { onSearch, onReset, isSingle, openIconType, onToggle, screenMd };
};

let QueryBlock = (props) => {
  const state = useStateHook(props, useStore());

  return (
    <div className="container-query-block">
      <FormLayout colon={true} gutter={0}>
        <FormItem row={1} span={span} label="应用名称">
          {props.form.getFieldDecorator("appName")(<Input/>)}
        </FormItem>
        <FormItem row={1} span={span} label="秘钥">
          {props.form.getFieldDecorator("secret")(<Input/>)}
        </FormItem>
        <FormItem row={1} span={span} label="重定向地址">
          {props.form.getFieldDecorator("redirect_url")(<Input/>)}
        </FormItem>
        <FormItem
          span={{
            xs: 24,
            sm: 24,
            md: (state.isSingle && state.screenMd) ? 12 : 24,
            lg: 6,
          }}
          wrapperAlign="right"
          row={state.isSingle ? 1 : 1}
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

QueryBlock = Form.create({})(QueryBlock);
export default QueryBlock;
