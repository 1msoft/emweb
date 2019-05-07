import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import RouteHelper from '../utils/RouteHelper';
import { public as routes } from '../config/routes';
import * as components from './index';
import '../assets/styles/style.css';
import '../assets/font/iconfont.css';
import '../assets/styles/myIcon.css';

class App extends React.Component {
  componentWillMount() {
    this.routeHelper = new RouteHelper({ routes });
  }

  render() {
    const routeList = this.routeHelper.getComponentRouteList('Root', { cascade: false });
    return (
      <Router>
        <Switch>
          {
            routeList.map( ({ path, exact, component }, idx)=>{
              return (
                <Route key={idx} path={path} exact={exact} component={components[component]} />
              )
            })
          }
        </Switch>
      </Router>
    );
  }
}
export default App;
