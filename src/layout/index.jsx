import React, {
  Fragment
} from 'react';
import Route from './subpage/Route';
import { BrowserRouter as Router } from 'react-router-dom';

import { HeaderSearch } from '@components';

export default () => {
  return (
    <Router>
      <Fragment>
        布局页 - 头
        <Route />
        布局页 - 尾
        <HeaderSearch />
      </Fragment>
    </Router>
  );
};
