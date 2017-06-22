import AppFrame from '../pages/basic/AppFrame';
import Login from '../pages/basic/Login';

import Home from '../pages/basic/Home'

import { User, UpsertUser } from '../pages/auth/User'

import NotFound from '../pages/basic/NotFound'

export default {
    // 登录
    LOGIN: {
        id: 1, text: '登录', path: '/login', parent: 'ROOT',
        component: Login,
        exact: true,
    },

    // 根目录
    INDEX: {
        id: 0, text: '根目录', path: '/', redirect: '/home', parent: 'ROOT',
        component: AppFrame,
    },

    // 导航 - 首页
    HOME: {
        id: 2, text: '首页', path:'/home', parent:'INDEX',
        nav: true, component: Home,
        exact: true,
    },

    // 导航 - 用户管理
    USER: {
        id: 15, text: '用户管理', path: '/user', parent: 'INDEX',
        nav: true, component: User,
    },
    USER_ADD: {
        id: 16, text: '新增用户', path: '/user/add', parent: 'INDEX',
        component: UpsertUser,
        // exact: true,
    },
    USER_EDIT: {
        id: 17, text: '编辑用户', path: '/user/edit/:id', parent: 'INDEX',
        component: UpsertUser,
        // exact: true,
    },

    // 通用 404 页面
    NOT_FOUND: {
        text: '未知', path: '/notfound', parent:'INDEX',
        icon: 'lock', component: NotFound,
        exact: true,
    }
}

