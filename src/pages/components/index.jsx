import React from 'react'
import { Layout } from 'antd'


import LeftNavMenu from '../../components/layout/LeftNavMenu'
import ContentBlock from '../../components/layout/ContentBlock'

import RouteHelper from '../../utils/RouteHelper'
import PermitHelper from '../../utils/PermitHelper'
import routes from '../../config/routes'

class Components extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      permitCode: undefined,
    };
  }

  componentWillMount() {
    this.permitHelper = new PermitHelper()
    this.routeHelper = new RouteHelper({
      routes,
      permitCode: this.state.permitCode,
      permitHelper: this.permitHelper,
    })
  }

  render() {
    const { location } = this.props
    const route = this.routeHelper.matchRoute(location.pathname)

    const { routeTree: navList, openKeys, selectedKeys } = this.routeHelper
      .getRouteTree('Components', route.routeName, { cascade: false })
    const contentRoutes = this.routeHelper.getComponentRouteList('Components', { cascade: false })

    return (
      <Layout className="ant-layout-has-sider">
        <LeftNavMenu navList={navList} openKeys={openKeys} selectedKeys={selectedKeys} />
        <ContentBlock routes={contentRoutes} current={route} className="content" />
      </Layout>
    )
  }
}

export default Components
