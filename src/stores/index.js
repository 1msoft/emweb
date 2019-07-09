import _ from 'lodash';
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable } from 'mobx';

// 扩展
import Request from './request';
import AppFrame from './AppFrame';

/**
 * 全局 store
 */
class Store {
  @observable request = new Request();
  @observable appFrame = new AppFrame();
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
