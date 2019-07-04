import React from 'react';
import { message } from "antd";
import { useLocalStore } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import { useStore as useGlobalStore } from '@stores';

class Store {
  constructor(global){
    global && (this.global = global);
    autorun(this.print);
  }

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
