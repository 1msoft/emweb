import React from 'react';
import { NotFound } from '@pages';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import * as pages from '@pages';

export default (props) => {
  return (
    <Switch>
      {
        props.routerList ? props.routerList.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={pages[route.component]}
          />
        )) : null
      }
      <Route component={NotFound}/>
    </Switch>
  );
};
