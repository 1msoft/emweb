// 路由配置
export default {
  Index: {
    text: '根目录', path: '/', parent: 'Root',
    component: 'HomePage', redirect: '/home',
    nav: false, exact: true,
  },

  Home: {
    text: '首页', path: '/home', parent: 'Index',
    component: 'HomePage', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  Demo: {
    text: '演示', path: '/demo', parent: 'Index',
    component: 'Demo', icon: "iconMail-xiaoxi",
  },

  Example: {
    text: '演示', path: '/example', parent: 'Index',
    component: 'Example', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  NotFound: {
    text: '404', path: '/404', parent: 'Index',
    component: 'NotFound',
    nav: false, exact: true,
  },

  ArchiveManage: {
    text: '档案管理', parent: 'Index',
    icon: "iconMail-xiaoxi",
    nav: true, exact: true,
  },

  ArchiveFile: {
    text: '文件', path: '/archive-manage/file', parent: 'ArchiveManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  BillManage: {
    text: '票据管理', parent: 'Index',
    icon: "iconMail-xiaoxi",
    nav: true, exact: true,
  },

  BillQuery: {
    text: '票据查询', path: '/bill-manage/query', parent: 'BillManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  BillUse: {
    text: '票据使用', path: '/bill-manage/use', parent: 'BillManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  BillType: {
    text: '票据类型', path: '/bill-manage/type', parent: 'BillManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  AcctManage: {
    text: '账户管理', parent: 'Index',
    icon: "iconMail-xiaoxi",
    nav: true, exact: true,
  },

  AcctQuery: {
    text: '账号查询', path: '/acct-manage/query', parent: 'AcctManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  AcctDetailQuery: {
    text: '账号明细查询', path: '/acct-manage/detail-query', parent: 'AcctManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  SystemManage: {
    text: '系统管理', parent: 'Index',
    icon: "iconMail-xiaoxi",
    nav: true, exact: true,
  },

  UserManage: {
    text: '用户管理', path: '/system-manage/user', parent: 'SystemManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  RoleManage: {
    text: '角色管理', path: '/system-manage/role', parent: 'SystemManage',
    component: 'HomePage',
    nav: true, exact: true,
  },

  ZoneManage: {
    text: '地区管理', path: '/system-manage/zone', parent: 'SystemManage',
    component: 'HomePage',
    nav: true, exact: true,
  },
};
