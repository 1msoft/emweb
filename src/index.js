import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';

import App from '@pages/App';
import { LocaleProvider } from 'antd';

import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '@assets/iconFont/iconfont.css';
import '@assets/styles/style.less';

import GlobalStore from './stores';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <GlobalStore>
      <App />
    </GlobalStore>
  </LocaleProvider>,
  document.getElementById('root')
);
