import _ from 'lodash';
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import { useStore as useGlobalStore } from '../../stores';
// 扩展 store
import Modal from '../../stores/modal';

// mock 数据
import { data } from './mock';

/**
 * 单页面 store
 */
class Store {
  constructor(global){
    global && (this.global = global);
    autorun(this.print);
  }

  @observable modal = new Modal();
  @observable list = [];
  @observable actionData = {};
  @observable queryParams = {};
  @observable page = { pageSize: 10, current: 1, total: 0 };

  /**
   * 修改查询参数
   */
  @action
  setParams = (params) => {
    this.queryParams = { ...this.queryParams, ...params };
  }

  /**
   * 修改 page
   */
  @action
  setPage = (page) => {
    this.page = { ...this.page, ...page };
  }

  /**
   * 获取列表
   */
  @action
  getList = () => {
    new Promise((resolve, reject) => {
      this.global && this.global.spin.add();
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
          data: mockData.splice((this.page.current - 1) * this.page.pageSize, this.page.pageSize),
        });
      }, 500);
    }).then(res => {
      this.global && this.global.spin.remove();
      this.list = [...res.data];
      this.setPage({
        current: 1,
        total: res.total,
      });
    });
  }

  /**
   * 编辑
   */
  @action
  edit = ({ id, values }) => {
    new Promise((resolve, reject) => {
      this.global && this.global.spin.add();
      setTimeout(item => {
        data.forEach( v => {
          if (v.key === id){
            _.forIn(values, (value, key) => {
              console.log(key, value);
              v[key] = value;
            });
          }
        });
        resolve(data);
      }, 500);
    }).then(res => {
      this.global && this.global.spin.remove();
      this.getList();
    });
  }

  /**
   * 添加
   */
  @action
  add = ({ values }) => {
    new Promise((resolve, reject) => {
      this.global && this.global.spin.add();
      setTimeout(v => {
        data.push({ ...values, key: new Date().toString() });
        resolve(data);
      }, 500);
    }).then(res => {
      this.global && this.global.spin.remove();
      this.getList();
    });
  }

  /**
   * 删除
   */
  @action
  delete = ({ id }) => {
    new Promise((resolve, reject) => {
      this.global && this.global.spin.add();
      setTimeout(v => {
        _.remove(data, v => (v.key === id));
        resolve(data);
      }, 500);
    }).then(res => {
      this.global && this.global.spin.remove();
      this.getList();
    });
  }

  // 打印状态
  print = () => {
    console.group('%c[store][Example]: 例子', 'color: green');
    console.log('list:', this.list);
    console.log('actionData:', this.actionData);
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
