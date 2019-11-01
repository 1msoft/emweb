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

  UserManage: {
    text: '用户管理', path: '/user-manage', parent: 'Index',
    component: 'UserManage', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  SystemManage: {
    text: '系统管理', path: '/system-manage', parent: 'Index',
    component: 'SystemManage', icon: "iconMail-xiaoxi",
    nav: true, exact: false,
  },

  NotFound: {
    text: '404', path: '/404', parent: 'Index',
    component: 'NotFound',
    nav: false, exact: true,
  },

};
