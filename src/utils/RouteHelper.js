import { matchPath } from 'react-router'

/**
 * 路由工具类
 *
 * @export
 * @class RouteHelper
 */
export default class RouteHelper {
  constructor(props = {}) {
    this.routes = props.routes
    this.permitCode = props.permitCode
    this.permitHelper = props.permitHelper
  }

  /**
   * 获取路由列表
   *
   * @param {any} filters      筛选函数，可选，多个逗号隔开
   * @returns
   */
  getRouteList(...filters) {
    const routeList = []

    Object.keys(this.routes).forEach( (routeName) => {
      const routeItem = this.routes[routeName]
      let route = {
        code: routeItem.id === undefined
          ? 0 : this.permitHelper.genPermitBitById(routeItem.id),
        routeName,
        ...routeItem,
      }

      for (const filter of filters) {
        if ( !filter.bind(this)(route) ) {
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
   * @param {any} rootRouteName  根路由名称
   * @param {any} cascade        是否级联获取下级路由
   */
  getComponentRouteList(rootRouteName, options = {}) {
    const { cascade = true } = options
    let routeList = this.getRouteList()
    routeList = this._getSubRoutes(routeList, rootRouteName, { flatten: true, cascade })
    return routeList.filter(this._checkComponentRoute)
  }

  /**
   * 筛选出导航菜单可见的路由
   */
  _checkVisibleRoute(route) {
    return route.nav === true
  }

  /**
   * 筛选出有对应组件的路由
   */
  _checkComponentRoute(route) {
    return route.component
  }

  /**
   * 筛选出有进入权限的路由
   */
  _checkPermittedRoute(route) {
    const code = this.permitHelper.genPermitBitById(route.id)
    return this.permitHelper.hasPermission(this.permitCode, code)
  }

  /**
   * 获取路由树（用于导航菜单）
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
   * @param {any} routeList
   * @param {any} parent
   * @param {any} flatten      是否扁平化
   * @param {any} cascade      是否级联
   * @returns
   */
  _getSubRoutes(routeList, parent, options = {}) {
    const { flatten = false, cascade = true, parentType = 'parent' } = options
    let routes = routeList

    if (parent) {
      routes = routes.filter( (route) => (route[parentType] || route.parent) === parent )
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
   * @param {any} routeName        子路由
   * @param {any} parentRouteName  父路由
   * @returns
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
   * @param {any} routeTree         路由树
   * @param {any} currentRouteName  当前路由名称
   * @param {any} markKey           标记字段名
   * @returns
   */
  _markRoutePath(routeTree, currentRouteName, options = {}) {
    options.markKey = options.markKey || 'current'
    options.openKeys = options.openKeys || []
    options.selectedKeys = options.selectedKeys || []

    if (!currentRouteName) return routeTree

    for (const branch of routeTree) {
      if ( this._belongTo(currentRouteName, branch.routeName) ) {
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
   */
  matchRoute(pathname) {
    const routeList = this.getComponentRouteList()

    return routeList.find( (route) => {
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
   * @param {any} routeName
   * @returns
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
