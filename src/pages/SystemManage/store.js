import React from 'react';
import { observable, action, autorun, computed, toJS } from 'mobx';
import { useLocalStore } from 'mobx-react';
import { useStore as useGlobalStore } from '@stores';
import fetchHelper from '@utils/fetchHelper';
import Modal from '@stores/modal';

const apiUrl = `http://192.168.31.162:7001`;

/**
 * Store
 *
 * @class Store
 */
class Store {
  @observable useInfo = [];
  @observable _page = {};
  @observable queryParams = {};
  @observable modal = new Modal();

  constructor(global) {
    global && (this.global = global);
    autorun(() => {console.log(toJS(this.useInfo), '--------------------->用户信息');});
  }

  @action
  setPage = (page) => {
    this.page = { ...this.page, ...page };
  }

  @action
  setParams = (params) => {
    this.queryParams = params || {};
  }

  @computed
  get loading() {
    return this._loading;
  }

  @computed
  get page() {
    return this._page;
  }

  @action
  getUsers = () => {
    const url = '/user';
    const query = this.queryParams;
    const fetchParams = {
      method: 'GET',
      url: `${apiUrl}${url}`,
      query,
      callback: (res) => {
        this.useInfo = toJS(res.data.data);
      }
    };
    fetchHelper(fetchParams, this.global);
  }

  @action
  createUser = (cb) => {
    const url = '/user';
    const query = this.queryParams;
    const fetchParams = {
      method: 'POST',
      url: `${apiUrl}${url}`,
      body: query,
      isFormDate: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "vary": "Origin"
      },
      callback: (res) => {
        if (res.data.respCode === undefined) {
          cb && cb();
          this.setParams({});
          this.getUsers();
        } else {
          console.log(res.data.message);
        }
      }
    };
    fetchHelper(fetchParams, this.global);
  }

  @action
  updateUser = (cb) => {
    const url = `/user/${this.queryParams.id}`;
    delete this.queryParams.id;
    const query = this.queryParams;
    const fetchParams = {
      method: 'PUT',
      url: `${apiUrl}${url}`,
      body: query,
      isFormDate: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "vary": "Origin"
      },
      callback: (res) => {
        if (res.respCode === 0 ) {
          cb && cb();
          this.setParams({});
          this.getUsers();
        }
      }
    };
    fetchHelper(fetchParams, this.global);
  }

  @action
  deleteUser = () => {
    const url = `/user/${this.queryParams.id}`;
    delete this.queryParams.id;
    const query = this.queryParams;
    const fetchParams = {
      method: 'DELETE',
      url: `${apiUrl}${url}`,
      body: query,
      callback: (res) => {
      }
    };
    fetchHelper(fetchParams, this.global);
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
