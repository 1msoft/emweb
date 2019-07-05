import React from 'react';
import { message } from "antd";
import { useLocalStore } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import { useStore as useGlobalStore } from '@stores';

import { data } from './mock';
import Modal from '@stores/modal';

/**
 * 演示 store
 */
class Store {
  constructor(global){
    global && (this.global = global);
    autorun(this.print);
    this.list = data;
  }

  @observable modal = new Modal();
  @observable list = [];
  @observable queryParams = {};
  @observable selectList = [];
  @observable page = { pageSize: 10, current: 1, total: 0 };

  /**
   * 修改查询参数
   */
  @action
  setParams = (params) => {
    this.queryParams = params;
  }

  /**
   * 修改 page
   */
  @action
  setPage = (page) => {
    this.page = { ...this.page, ...page };
  }

  @action
  setSelectList = (selectList) => {
    this.selectList = [...selectList];
  }

  @action
  getList = () => {
    new Promise((resolve, reject) => {
      setTimeout(item => {
        let mockData = [...data];
        const { name } = this.queryParams;
        // 处理查询条件
        if (name){
          const reg = new RegExp(name);
          mockData = mockData.filter( v => (reg.test(v.name)));
        }
        let total = mockData.length;
        resolve({
          total,
          data: mockData
        });
      }, 500);
    }).then(res => {
      this.list = [...res.data];
      this.setPage({
        current: 1,
        total: res.total,
      });
    });
  }

  /**
   * 添加
   */
  @action
  add = ({ values }) => {
    new Promise((resolve, reject) => {
      setTimeout(v => {
        data.push({ ...values, key: new Date().toString() });
        resolve(data);
      }, 500);
    }).then(res => {
      message.success('添加成功！');
      this.getList();
    });
  }

  // 打印状态
  print = () => {
    console.group('%c[store][Example]: 例子', 'color: green');
    console.log('list:', this.list);
    console.log('selectList:', this.selectList);
    console.log('queryParams:', this.queryParams);
    console.groupEnd();
  }
}

const storeContext = React.createContext(null);

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

export default (props) => {
  const global = useGlobalStore();
  const store = useLocalStore(() => (new Store(global)));
  return (
    <storeContext.Provider value={store}>
      {props.children}
    </storeContext.Provider>
  );
};
