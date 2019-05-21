import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';

import Layout from './layout/index';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';

import stores from './stores';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '@assets/iconFont/iconfont.css';

ReactDOM.render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <Layout />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
