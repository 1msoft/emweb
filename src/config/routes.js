import * as pages from '@pages';
// 路由配置
export default [
  {
    path: '/',
    exact: true,
    component: pages.HomePage
  }, {
    path: '/example',
    exact: false,
    component: pages.Example
  }
];
