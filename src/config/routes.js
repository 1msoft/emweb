/**
 * 公开路由
 */
exports.public = {
	// 登录页面
	Login: {
		text: '登录', path: '/login', parent: 'Root',
		component: 'Login', exact: true,
	},
	// 根目录
	Index: {
		text: '根目录', path: '/', parent: 'Root',
		component: 'AppFrame',
	},
	// 通用 404 页面
	NotFound: {
		text: '未知', path: '/notfound', parent: 'Root',
		icon: 'lock', component: 'NotFound',
		exact: true,
	},
};

/**
 * 非公开路由
 */
exports.private = {
	// 根目录
	Index: {
		text: '根目录', path: '/', parent: 'Root',
		component: 'AppFrame', type: 'class',
	},

	HomePage: {
		text: '首页', path: '/home', parent: 'Index',
		nav: true, component: 'HomePage'
	},

	TestPage: {
		text: '测试', path: '/test', parent: 'Index',
		nav: true, component: 'TestPage', type: 'class'
	},
	Test_1: {
		text: '测试一', path: '/test/1', parent: 'TestPage',
		nav: true, component: 'Test_1'
	},
	Test_2: {
		text: '测试二', path: '/test/2', parent: 'TestPage',
		nav: true, component: 'Test_2'
	},
}
