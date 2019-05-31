import {
  HomePage,
  NotFound,
} from '@pages';
// 路由配置
export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/404',
    exact: true,
    component: NotFound
  },
];
