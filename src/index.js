import 'core-js/es6/map';
import 'core-js/es6/set';
import 'react-dom';
import 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';

import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './pages/App';

import stores from './stores';

ReactDOM.render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
