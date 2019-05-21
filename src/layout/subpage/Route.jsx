import React from 'react';
import { NotFound } from '@pages';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import settings from '@config/routes';

export default () => {
  return (
    <Switch>
      {
        settings ? settings.map(setting => (
          <Route
            key={setting.path}
            path={setting.path}
            exact={setting.exact}
            component={setting.component}
          />
        )) : null
      }
      <Route component={NotFound}/>
    </Switch>
  );
};
