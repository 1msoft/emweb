// 路由配置
export default {

  LoginRegister: {
    text: '登陆-注册', path: '/login-register', parent: 'Root',
    component: 'LoginRegister',
    nav: false, exact: true,
  },

  Index: {
    text: '根目录', path: '/', parent: 'Root',
    component: 'AppFrame', redirect: '/home',
    nav: false, exact: false,
  },

  Home: {
    text: '首页', path: '/home', parent: 'Index',
    component: 'HomePage', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  BasisForm: {
    text: '基础表单', path: '/basis-form', parent: 'Index',
    component: 'BasisForm', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  NotFound: {
    text: '404', path: '/404', parent: 'Index',
    component: 'NotFound',
    nav: false, exact: true,
  },

  QueryTable: {
    text: '查询表格', path: '/query-table', parent: 'Index',
    component: 'QueryTable', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },
};
