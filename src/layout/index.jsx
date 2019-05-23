import React, {
  Fragment
} from 'react';
import Route from './subpage/Route';
import SubSystem from './subpage/SubSystem';
import { BrowserRouter as Router } from 'react-router-dom';
export default () => {
  return (
    <Router>
      <Fragment>
        {/* 布局页 - 头 */}
        <div>
          <SubSystem />
        </div>
        <Route />
        布局页 - 尾
      </Fragment>
    </Router>
  );
};
