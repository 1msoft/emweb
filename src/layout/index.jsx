import React, {
  Fragment
} from 'react';
import { Spin } from 'antd';
import Route from './subpage/Route';
import NavButton from '../components/nav-button/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useObserver } from "mobx-react-lite";
import { HeaderSearch } from '@components';

import { useStore } from '../stores';

export default () => useObserver(() => {
  const store = useStore();
  return (
    <Router>
      <Spin size="large" spinning={store.spin.loading}>
        {/* 布局页 - 头 */}
        <div>
          <NavButton />
        </div>
        <Route />
        布局页 - 尾
        <HeaderSearch />
      </Spin >
    </Router>
  );
});
