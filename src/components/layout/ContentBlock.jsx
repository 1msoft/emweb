import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
// import cookie from '../../utils/cookie'


// 内容页路由定义
const ContentBlock = ({ ...props }) => {
  const { routes, current, style, className, root } = props
  if (current && current.redirect) {
    return (
      <div style={style} className={className}>
        <Redirect to={current.redirect} />
      </div>
    )
  }
  return (
    <div style={style} className={className}>
      <Switch>
      {
        routes.map( ({ path, exact, component }, idx)=>{
          return(
            <PrivateRoute
              key={idx}
              path={path}
              exact={exact}
              component={component}
              current={current}
              root={root} />
          )
        })
      }
      </Switch>
    </div>
  )
}

const PrivateRoute = ({ component: Component, current, root, ...rest }) => (
  <Route {...rest} render={(props) => (
    // cookie.get("_id") !== undefined ? (
    //   <Component {...props}/>
    // ) : (
      /*<Redirect to='/login' />*/
      <Component {...props} current={current} root={root} />
    // )
  )} />
)

export default ContentBlock
