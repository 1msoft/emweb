import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

import * as pages from '@pages';
import { useStore } from '@stores/';

const App = () => {
  const store = useStore();
  const routeHelper = store.appFrame.routeHelper;
  const routeList = routeHelper.getComponentRouteList('Root', { cascade: false });
  return (
    <Router>
      <Switch>
        {
          routeList.map( ({ path, exact, component }, idx)=>{
            return (
              <Route key={idx} path={path} exact={exact} component={pages[component]} />
            );
          })
        }
      </Switch>
    </Router>
  );
};

export default App;