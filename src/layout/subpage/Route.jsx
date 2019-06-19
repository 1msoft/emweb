import React from 'react';
import { NotFound } from '@pages';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import * as pages from '@pages';

const renderRoute = (route) => {
  if (route.redirect) {
    return (
      <Route
        key={route.key}
        exact={route.exact}
        path={route.path}
        render={() => <Redirect to={route.redirect} />} />
    );
  }
  return (
    <Route
      key={route.key}
      key={route.path}
      path={route.path}
      exact={route.exact}
      component={pages[route.component]} />
  );
};

export default (props) => {
  return (
    <Switch>
      {
        props.routerList ? props.routerList.map(route => (
          renderRoute(route)
        )) : null
      }
      <Route component={NotFound}/>
    </Switch>
  );
};
