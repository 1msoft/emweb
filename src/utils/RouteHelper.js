import { matchPath } from 'react-router';
import PermitHelper from './PermitHelper';

/**
 * 路由工具类
 *
 * @export
 * @class RouteHelper
 */
export default class RouteHelper {
  constructor(props = {}) {
    this._permitCode = props.permitCode;
    this.permitHelper = new PermitHelper();
    this.routes = props.routes || {};
  }

  get routes() {
    return this._routes;
  }
  set routes(routes) {
    const _routes = {};
    Object.keys(routes).forEach( (routeKey) => {
      const routeItem = routes[routeKey];
      _routes[routeKey] = {
        routeName: routeKey,
        name: routeKey,
        code: routeItem.id === undefined
          ? 0 : this.permitHelper.genPermitBitById(routeItem.id),
        ...routeItem,
        parent: String(routeItem.parent),
      };
    });

    this._routes = _routes;
  }
  get permitCode() {
    return this._permitCode;
  }
  set permitCode(permitCode) {
    this.permitCode = permitCode;
  }

  findRouteByName(name) {
    let route;
    for (let key in this.routes) {
      if (this.routes[key].name === name) {
        route = this.routes[key];
        break;
      }
    }
    return route;
  }

  /**
   * 获取路由列表
   *
   * @param {any} filters      筛选函数，可选，多个逗号隔开
   * @returns
   */
  getRouteList(...filters) {
    const routeList = [];

    Object.keys(this.routes).forEach( (routeKey) => {
      const route = this.routes[routeKey];
      for (const filter of filters) {
        if ( !filter.bind(this)(route) ) {
          return;
        }
      }
      routeList.push(route);
    });

    return routeList;
  }

  /**
   * 获取可链接路由列表
   *
   * @param {any} rootRouteName  根路由名称
   * @param {any} cascade        是否级联获取下级路由
   */
  getComponentRouteList(rootRouteName, options = {}) {
    const { cascade = true } = options;
    let routeList = this.getRouteList();
    routeList = this._getSubRoutes(routeList, rootRouteName, { flatten: false, cascade });
    return routeList.filter(this._checkComponentRoute);
  }

  /**
   * 筛选出导航菜单可见的路由
   */
  _checkVisibleRoute(route) {
    return route.nav === true;
  }

  /**
   * 筛选出有对应组件的路由
   */
  _checkComponentRoute(route) {
    return route.component;
  }

  /**
   * 筛选出有进入权限的路由
   */
  _checkPermittedRoute(route) {
    const code = this.permitHelper.genPermitBitById(route.id);
    return this.permitHelper.hasPermission(this.permitCode, code);
  }

  /**
   * 获取路由树（用于导航菜单）
   */
  getRouteTree(rootRouteName, currentRouteName, options = {}) {
    const { cascade, parentType = 'navParent' } = options;
    // 组织路由过滤条件
    const filters = [this._checkVisibleRoute];
    this.permitCode && filters.push(this._checkPermittedRoute);
    // 获取路由列表
    const routeList = this.getRouteList(...filters);
    // 组织路由树
    let routeTree = this._getSubRoutes(routeList, rootRouteName, { parentType, cascade });
    routeTree = this._filterVisible(routeTree);
    // 根据当前路由名称，标记当前路由路径字段 current
    const res = this._markRoutePath(routeTree, currentRouteName);
    return res;
  }
  /**
   * 获取可见路由
   * @param {*} list
   */
  _filterVisible(routes) {
    const navRoutes = routes.filter(item => item.nav);
    for (const item of navRoutes) {
      if (item.children) {
        const branch = this._filterVisible(item.children);
        item.visChildren = branch;
      }
    }
    return navRoutes;
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
    const { flatten = false, cascade = true, parentType = 'parent' } = options;
    let routes = routeList;

    if (parent) {
      routes = routes.filter( (route) => (route[parentType] || route.parent) === parent);
    }

    // 非级联，直接返回
    if (!cascade) {
      return routes;
    }

    // 级联，则遍历下级路由，以扁平/树状返回
    for (const route of routes) {
      if (route.cascade === false) {
        continue;
      }

      const branch = this._getSubRoutes(
        routeList,
        route.routeName,
        { flatten, cascade, parentType }
      );
      if (flatten) {
        routes = routes.concat(branch);
      } else {
        branch.length > 0 && (route.children = branch);
      }
    }
    return routes;
  }

  /**
   * 判断特定路由是否从属于指定路由
   *
   * @param {any} routeName        子路由
   * @param {any} parentRouteName  父路由
   * @returns
   */
  _belongTo(routeName, parentRouteName, parentType = 'navParent') {
    let route = this.routes[routeName];
    let parentName = routeName;

    while (route) {
      if (parentName === parentRouteName) {
        return true;
      }

      parentName = route[parentType] || route.parent;
      route = this.routes[parentName];
    }

    return false;
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
    options.markKey = options.markKey || 'current';
    options.openKeys = options.openKeys || [];
    options.selectedKeys = options.selectedKeys || [];

    if (!currentRouteName) return routeTree;

    for (const branch of routeTree) {
      if ( this._belongTo(currentRouteName, branch.routeName) ) {
        branch[options.markKey] = true;
        if (currentRouteName === branch.routeName) {
          branch.nav
            ? options.selectedKeys.push(branch.routeName)
            : options.selectedKeys.push(branch.parent);
        } else {
          if (branch.children) {
            options.openKeys.push(branch.routeName);
            this._markRoutePath(branch.children, currentRouteName, options);
          } else {
            options.selectedKeys.push(branch.parent);
          }
        }
      }
    }
    return Object.assign({ routeTree }, options);
  }

  /**
   * 根据 url 路径返回匹配的路由定义
   */
  matchRoute(pathname) {
    const routeList = this.getRouteList();

    return routeList.find( (route) => {
      return matchPath(pathname, {
        path: route.path,
        exact: true,
        strict: true,
      });
    });
  }

  /**
   * 组织面包屑导航
   *
   * @param {any} routeName
   * @returns
   */
  getBreadCrumb(routeName) {
    let breadCrumbs = [];

    let route = routeName ? this.routes[routeName] : null;

    while (route) {
      breadCrumbs.unshift(route);
      route = this.routes[route.parent];
    }

    return breadCrumbs;
  }
}
