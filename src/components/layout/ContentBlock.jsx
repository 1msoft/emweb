import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import cookie from '../../utils/cookie'


// 内容页路由定义
const ContentBlock = ({ routes, current }) => {
  if (current.redirect) {
    return <Redirect to={current.redirect} />
  }
  return (
    <div>
    {
      routes.map( ({ path, exact, component }, idx)=>{
        return(
          <PrivateRoute key={idx} path={path} exact={exact} component={component} />
        )
      })
    }
    </div>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookie.get("_id") !== undefined ? (
      <Component {...props}/>
    ) : (
      /*<Redirect to='/login' />*/
      <Component {...props}/>
    )
  )} />
)

export default ContentBlock
