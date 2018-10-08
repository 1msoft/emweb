import { matchPath } from 'react-router'

/**
 * 路由工具类
 *
 * @export
 * @class RouteHelper
 * @param {Object} props={}
 * @param {Object} props.permitCode 许可证号
 * @param {Object} props.permitHelper 帮手
 */
class RouteHelper {
  constructor(props = {}) {
    this.routes = props.routes
    this.permitCode = props.permitCode
    this.permitHelper = props.permitHelper
  }

  /**
   * 获取路由列表
   *
   * @param {Function[]} filters 筛选函数，可选，多个逗号隔开
   * @returns {Array} 路由列表
   * @memberof RouteHelper
   */
  getRouteList(...filters) {
    const routeList = []

    Object.keys(this.routes).forEach((routeName) => {
      const routeItem = this.routes[routeName]
      let route = {
        code: routeItem.id === undefined
          ? 0 : this.permitHelper.genPermitBitById(routeItem.id),
        routeName,
        ...routeItem,
      }

      for (const filter of filters) {
        if (!filter.bind(this)(route)) {
          return
        }
      }

      routeList.push(route)
    })

    return routeList
  }

  /**
   * 获取可链接路由列表
   *
   * @param {String} rootRouteName 根路由名称
   * @param {Object} [options={}] 扩展选项
   * @param {Boolean} options.cascade=true 是否级联获取下级路由
   * @returns {Array} 路由列表
   * @memberof RouteHelper
   */
  getComponentRouteList(rootRouteName, options = {}) {
    const { cascade = true } = options
    let routeList = this.getRouteList()
    routeList = this._getSubRoutes(routeList, rootRouteName, { flatten: true, cascade })
    return routeList.filter(this._checkComponentRoute)
  }

  /**
   * 筛选出导航菜单可见的路由
   *
   * @param {*} route 路由
   * @returns {Boolean} true|false
   * @memberof RouteHelper
   */
  _checkVisibleRoute(route) {
    return route.nav === true
  }

  /**
   * 筛选出有对应组件的路由
   *
   * @param {*} route 路由
   * @returns {Boolean} true|false
   * @memberof RouteHelper
   */
  _checkComponentRoute(route) {
    return route.component
  }

  /**
   * 筛选出有进入权限的路由
   *
   * @param {*} route 路由
   * @returns {Boolean} true|false
   * @memberof RouteHelper
   */
  _checkPermittedRoute(route) {
    const code = this.permitHelper.genPermitBitById(route.id)
    return this.permitHelper.hasPermission(this.permitCode, code)
  }

  /**
   * 获取路由树（用于导航菜单）
   *
   * @param {String} rootRouteName 根路由名称
   * @param {String} currentRouteName 当前路由名称
   * @param {Object} [options={}] 扩展选项
   * @returns {Array} 路由树
   * @memberof RouteHelper
   */
  getRouteTree(rootRouteName, currentRouteName, options = {}) {
    const { cascade } = options
    // 组织路由过滤条件
    const filters = [this._checkVisibleRoute]
    this.permitCode && filters.push(this._checkPermittedRoute)
    // 获取路由列表
    const routeList = this.getRouteList(...filters)
    // 组织路由树
    let routeTree = this._getSubRoutes(routeList, rootRouteName, { parentType: 'navParent', cascade })
    // 根据当前路由名称，标记当前路由路径字段 current
    const res = this._markRoutePath(routeTree, currentRouteName)
    return res
  }

  /**
   * 获取子级路由
   *
   * @param {*} routeList                     路由列表
   * @param {*} parent                        父级名称
   * @param {Object} [options={}]             扩展选项
   * @param {Boolean} [options.flatten=false] 是否扁平化
   * @param {Boolean} [options.cascade=true]  是否级联
   * @returns {Array} 子级路由
   * @memberof RouteHelper
   */
  _getSubRoutes(routeList, parent, options = {}) {
    const { flatten = false, cascade = true, parentType = 'parent' } = options
    let routes = routeList

    if (parent) {
      routes = routes.filter((route) => (route[parentType] || route.parent) === parent)
    }

    // 非级联，直接返回
    if (!cascade) {
      return routes
    }

    // 级联，则遍历下级路由，以扁平/树状返回
    for (const route of routes) {
      if (route.cascade === false) {
        continue
      }

      const branch = this._getSubRoutes(routeList, route.routeName, { flatten, cascade, parentType })
      if (flatten) {
        routes = routes.concat(branch)
      } else {
        branch.length > 0 && (route.children = branch)
      }
    }
    return routes
  }

  /**
   * 判断特定路由是否从属于指定路由
   *
   * @param {Strng} routeName         路由名称
   * @param {String} parentRouteName   父级路由名称
   * @returns {Boolean} true或者false
   * @memberof RouteHelper
   */
  _belongTo(routeName, parentRouteName) {
    let route = this.routes[routeName]
    let parentName = routeName

    while (route) {
      if (parentName === parentRouteName) {
        return true
      }

      parentName = route.navParent || route.parent
      route = this.routes[parentName]
    }

    return false
  }

  /**
   * 标记根据特定路由，标记其在路由树中的路径
   *
   * @param {Object[]} routeTree                      路由树
   * @param {String} currentRouteName               当前路由名称
   * @param {Object} [options={}]              扩展选项
   * @param {String} [options.markKey='current']    扩展选项
   * @returns
   * @memberof RouteHelper
   */
  _markRoutePath(routeTree, currentRouteName, options = {}) {
    options.markKey = options.markKey || 'current'
    options.openKeys = options.openKeys || []
    options.selectedKeys = options.selectedKeys || []

    if (!currentRouteName) return routeTree

    for (const branch of routeTree) {
      if (this._belongTo(currentRouteName, branch.routeName)) {
        branch[options.markKey] = true
        if (branch.children) {
          options.openKeys.push(branch.routeName)
          this._markRoutePath(branch.children, currentRouteName, options)
        } else {
          options.selectedKeys.push(branch.routeName)
        }
      }
    }
    return Object.assign({ routeTree }, options)
  }

  /**
   * 根据 url 路径返回匹配的路由定义
   *
   * @param {String} pathname 路径名称
   * @returns
   * @memberof RouteHelper
   */
  matchRoute(pathname) {
    const routeList = this.getComponentRouteList()

    return routeList.find((route) => {
      return matchPath(pathname, {
        path: route.path,
        exact: true,
        strict: true,
      })
    })
  }

  /**
   * 组织面包屑导航
   *
   * @param {String} routeName 路由名称
   * @returns
   * @memberof RouteHelper
   */
  getBreadCrumb(routeName) {
    let breadCrumbs = []

    let route = routeName ? this.routes[routeName] : null

    while (route) {
      breadCrumbs.unshift(route)
      route = this.routes[route.parent]
    }

    return breadCrumbs
  }
}

export default RouteHelper
