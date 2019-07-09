import _ from 'lodash';
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import routes from '@config/routes';
import RouteHelper from '@utils/RouteHelper';

/**
 * 全局 store
 */
class AppStore {
  @observable routeHelper = new RouteHelper({ routes });
}

export default AppStore;
