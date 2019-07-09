import React from 'react';
import { observable, action, autorun, computed } from 'mobx';
import { useLocalStore } from 'mobx-react';

import fetchHelper from '@utils/fetchHelper';
import data from './mock';

/**
 * Store
 *
 * @class Store
 */
class Store {
  @observable _data = data;
  @observable _selectedRow = [];
  @observable _conds = {};
  @observable _loading = false;
  @observable _page = {};

  constructor() {

  }

  @action
  setProperty = (property, value) => this[`_${property}`] = value

  @action
  setPropertyPatch = (property, value) => ({ ...this[`_${property}}`], ...value })

  @computed
  get selectedRow() {
    return this._selectedRow.toJS();
  }

  @computed
  get data() {
    return this._data.toJS();
  }

  @computed
  get loading() {
    return this._loading;
  }

  @computed
  get page() {
    return this._page;
  }

  @computed
  get global() {
    return {};
  }

  @action
  fetch = async (params) => {
    const callback = params.callback;
    return new Promise((resolve) => {
      params.callback = (res) => resolve(res);
      fetchHelper(params, this.global);
    }).then(callback);
  }
}

const storeContext = React.createContext(null);
export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

export default (props) => {
  const store = useLocalStore(() => (new Store()));
  return (
    <storeContext.Provider value={store}>
      {props.children}
    </storeContext.Provider>
  );
};
