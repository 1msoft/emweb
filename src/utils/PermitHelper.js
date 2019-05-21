/**
 * 权限工具类
 * 
 * @export
 * @class PermitHelper
 */
export default class PermitHelper {
  constructor(permits = {}) {
    this.permits = this.completePermits(permits);
  }
  
  /**
   * 根据权限对象中每个权限的id值补全code字段，即单个权限码
   * 补全每个权限的index字段，即序号
   * 
   * @param {any} permits 权限对象
   */
  completePermits(permits) {
    const finalPermits = {};
    
    Object.keys(permits).forEach( (key, idx) => {
      const completed = { ...permits[key] };
      completed.index = idx;
      completed.code = this.genPermitBitById(completed.id);
      finalPermits[key] = completed;
    });
    
    return finalPermits;
  }

  /**
   * 转换并获取路由权限对象
   * 
   * @param {any} routes 路由对象
   * @returns
   */
  getRoutePermits(routes) {
    const permits = {};
    
    Object.keys(routes).forEach( (routeName, idx) => {
      const route = routes[routeName];

      // 剔除无权限访问限制的路由
      if (route.id === undefined) return;

      permits[routeName] = {
        id: route.id,
        index: idx,
        desc: route.text,
        code: this.genPermitBitById(route.id),
      };
    });

    return permits;
  }

  /**
   * 获取权限列表
   * @return {Array}              已排序权限列表
   */
  getPermitList() {
    if (this.permitList) {
      return this.permitList;
    }

    let permitList = Object.keys(this.permits)
      .map( (key) => {
        const permit = this.permits[key];
        permit.name = key;
        return permit;
      })
      .sort( (a, b) => a.index - b.index);

    this.permitList = permitList;
    return permitList;
  }

  /**
   * 根据权限id获取单个权限码（十进制）
   * @param  {Number} id         权限id
   * @return {Number}            权限码（十进制）
   */
  genPermitBitById(id) {
    return Math.pow(2, id);
  }

  /**
   * 根据权限id列表，生成角色权限码（十进制）
   * @param  {Array}  ids          权限id列表
   * @return {Number}              角色权限码（十进制）
   */
  genPermitCodeByIds(ids) {
    let permitCode = 0;
    for (let id of ids) {
      permitCode |= this.genPermitBitById(id);
    }
    return permitCode;
  }

  /**
   * 判断是否有单个权限
   * 
   * @param {any} permitCode 权限码（十进制）
   * @param {any} permitBit  单个权限码（十进制）
   * @returns                true有权限，false无权限
   */
  hasPermission(permitCode, permitBit) {
    return permitCode === undefined || permitBit === 0 || (permitCode & permitBit) !== 0;
  }

  /**
   * 根据角色权限码，获取权限列表
   * @param  {Number}  permitCode        权限码（十进制）
   * @param  {Boolean} filter            是否过滤无权限项目
   * @return {Array}                     权限列表
   */
  getListByCode(permitCode, filter) {
    let permitList = this.getPermitList();

    if (permitCode !== undefined) {
      permitList = permitList.map( (item) => {
        item.status = this.hasPermission(permitCode, item.code);
        return item;
      });

      if (filter) {
        permitList = permitList.filter( (item) => item.status);
      }
    }

    return permitList;
  }
}