import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import RouteHelper from '../utils/RouteHelper'
import PermitHelper from '../utils/PermitHelper'
import routes from '../config/routes'

import '../assets/style/ant-reset.css'
import '../assets/style/style.css'

class App extends React.Component {
  componentWillMount() {
    this.routeHelper = new RouteHelper({
      routes,
      permitHelper: new PermitHelper(),
    })
  }

  render() {
    const routes = this.routeHelper.getComponentRouteList('Root', { cascade: false })
    return (
      <Router>
        <div style={{height: '100%'}}>
          {
            routes.map( ({ path, exact, component }, idx)=>{
              return (
                <Route key={idx} path={path} exact={exact} component={component} />
              )
            })
          }
        </div>
      </Router>
    );
  }
}


export default App;
