import AppFrame from '../pages/basic/AppFrame';
import Login from '../pages/basic/Login';

import Home from '../pages/basic/Home'
import NotFound from '../pages/basic/NotFound'

import Components from '../pages/components'
import Scenes from '../pages/scenes'

import { User, UpsertUser } from '../pages/auth/User'

import QueryForm from '../pages/components/QueryForm'
import Collapse from '../pages/components/Collapse'
import CostomForm from '../pages/components/CostomForm'
import PieChart from '../pages/components/PieChart'
import PaginationCard from '../pages/components/PaginationCard'

export default {
    // 登录
    Login: {
        id: 0, text: '登录', path: '/login', parent: 'Root',
        component: Login,
        exact: true,
    },

    // 根目录
    Index: {
        id: 1, text: '首页', path: '/', redirect: '/home', parent: 'Root',
        component: AppFrame,
    },

    // 导航 - 首页
    Home: {
        id: 2, text: '首页', path:'/home', parent:'Index',
        nav: true, component: Home,
        exact: true,
    },

    // 导航 - 布局
    Layout: {
        id: 3, text: '布局', path:'/layout', parent:'Index',
        nav: true, component: Home,
        exact: true,
    },

    // 导航 - 布局 - 上-中-下
    HeaderContentFooter: {
        id: 3, text: '页头-内容-页脚', path:'/layout/header-content-footer', parent:'Index', navParent: 'Layout',
        nav: true, component: Home,
    },

    // 导航 - 布局 - 页头-内容(含左导航)-页脚
    HeaderInnerSider: {
        id: 4, text: '页头-内容(含左导航)-页脚', path:'/layout/header-inner-sider', parent:'Index', navParent: 'Layout',
        nav: true, component: Home,
    },

    // 导航 - 布局 - 页头-左导航-右内容(含页脚)
    HeaderOuterSider: {
        id: 3, text: '页头-左导航-右内容(含页脚)', path:'/layout/header-outer-sider', parent:'Index', navParent: 'Layout',
        nav: true, component: Home,
    },

    // 导航 - 布局 - 页头-左导航-右内容(含页脚)
    Sider: {
        id: 3, text: '左导航-右内容(页头-内容-页脚)', path:'/layout/sider', parent:'Index', navParent: 'Layout',
        nav: true, component: Home,
    },

    // 导航 - 组件
    Components: {
        id: 5, text: '组件', path:'/components', redirect: '/components/query', parent:'Index',
        nav: true, component: Components, cascade: false,
    },

    // 导航 - 组件 - 组合查询
    Query: {
        id: 7, text: '查询组件测试', path:'/components/query', parent: 'Components',
        nav: true, component: QueryForm,
        exact: true,
    },

    // 导航 - 组件 - 折叠面板
    Collapse: {
        id: 13, text: '折叠面板', path: '/components/collapse', parent: 'Components',
        nav: true, component: Collapse,
        exact: true,
    },

    // 导航 - 组件 - 表单
    CostomForm: {
        id: 14, text: '表单', path: '/components/costomform', parent: 'Components',
        nav: true, component: CostomForm,
        exact: true,
    },

    // 导航 - 组件 - 简单饼图
    PieChart: {
        id: 15, text: '简单饼图', path: '/components/piechart', parent: 'Components',
        nav: true, component: PieChart,
        exact: true,
    },

    // 导航 - 组件 - 卡片式列表
    CardList: {
        id: 16, text: '卡片式列表', path: '/components/paginationcard', parent: 'Components',
        nav: true, component: PaginationCard,
        exact: true,
    },

    // 导航 - 场景
    Scenes: {
        id: 5, text: '场景', path:'/scenes', parent:'Index',
        nav: true, component: Scenes, cascade: false,
    },

    // 导航 - 场景 - 场景1
    Scene1: {
        id: 13, text: '未找到', path: '/scenes/scene1', parent: 'Scenes',
        nav: true, component: NotFound,
        exact: true,
    },

    // 导航 - 用户管理
    User: {
        id: 6, text: '用户管理', path: '/user', parent: 'Index',
        nav: true, component: User,
    },

    UserAdd: {
        id: 16, text: '新增用户', path: '/user/add', parent: 'Index',
        component: UpsertUser,
        // exact: true,
    },
    UserEdit: {
        id: 17, text: '编辑用户', path: '/user/edit/:id', parent: 'Index',
        component: UpsertUser,
        // exact: true,
    },

    // 通用 404 页面
    NotFound: {
        text: '未知', path: '/notfound', parent:'Index',
        icon: 'lock', component: NotFound,
        exact: true,
    }
}

