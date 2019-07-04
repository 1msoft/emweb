import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';

import Layout from './layout/index';
import { LocaleProvider } from 'antd';

import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '@assets/iconFont/iconfont.css';
import '@assets/styles/style.css';

import GlobalStore from './stores';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <GlobalStore>
      <Layout />
    </GlobalStore>
  </LocaleProvider>,
  document.getElementById('root')
);
