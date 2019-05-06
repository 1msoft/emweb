import moment from 'moment';
import { getCookie, setCookie } from './helper';
import { createHashHistory } from 'history';
import { setTimeout } from 'core-js/library/web/timers';

const history = createHashHistory();

function queryParams(params) {
	let queryString = '';
	let arr = [];
	for (let key in params) {
		if (params[key]) {
			const value = typeof params[key] === 'string' ?
				params[key] : JSON.stringify(params[key]);
			arr.push(`${key}=${encodeURIComponent(value)}`);
		}
	}
	queryString += arr.join('&');
	return queryString;
}

function fetchRequest(method, url, query, param, body, headers) {
	const token = getCookie('token');
	let request;
	headers = headers || {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};
	body = headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body
	let path = '';
	switch (method) {
		case 'GET':
			// 参数添加时间戳
			const reQuery = Object.assign({}, query, { tiemStamp: new Date().getTime()});
			const reQueryString = queryParams(reQuery);
			path = `${url}${param ? `/${param}` : ''}${reQueryString ? `?${reQueryString}` : ''}`;
			request = fetch(path, {
				method,
				headers: Object.assign(headers, { Authorization: token }),
				credentials: 'include',
			});
			break;
		default:
			const queryString = queryParams(query);
			path = `${url}${param ? `/${param}` : ''}${queryString ? `?${queryString}` : ''}`;
			request = fetch(path, {
				method,
				headers: Object.assign(headers, { Authorization: token }),
				credentials: 'include',
				body,
			});
			break;
	}
	console.log(`%cFetchRequest ${method}: `, 'color: #6eafd4', query);
	return request.then((res) => {
		// 判断token是否过期
		const resToken = res.headers.get('Authorization');
		if (resToken && resToken !== token) { setCookie('token', resToken); }
		if (res.headers.get('Content-Type') ===
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			(res.headers.get('Content-Type') ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8')) {
			res.blob().then(blob => {
				let a = document.createElement('a')
				let url = window.URL.createObjectURL(blob)
				let filename = `${moment().format('YYYYMMDDHHmmss')}.xlsx`
				a.href = url;
				a.download = filename;
				a.click();
				window.URL.revokeObjectURL(url);
			})
		} else {
			return res.json().then((body) => {
				const status = res.status;
				const msg = body.message;
				if (status >= 400) {
					if (status === 401) {
						const error = new Error();
						error.message = body.error || body.message || '服务器错误';
						error.errors = body;
						setTimeout(() => {
							history.push('/login');
						}, 2500)
						throw error;
					} else if (status === 403) {
						const error = new Error();
						error.message = body.error || body.message || '服务器错误';
						error.errors = body;
						setTimeout(() => {
							history.push('/login');
						}, 2500)
						throw error;
					} else {
						const error = new Error();
						error.message = body.error || body.message || '服务器错误';
						error.errors = body;
						throw error;
					}
				}
				return body;
			});
		}
	});
}

export default function fetchHelper(queryParams, commonStore = {}) {
	const { method, url, query, param, body, headers, callback, isStop = true } = queryParams;
	if (typeof method !== 'string') {
		throw new Error('requestType not specified: 需要指定请求类型');
	}
	if (typeof url !== 'string') {
		throw new Error('url not specified: 需要指定请求api');
	}
	//全局加载中开始
	(commonStore.loading === false) && commonStore.loadingStart();
	fetchRequest(method, url, query, param, body, headers).then(
		(res) => {
			callback && callback(res);
			//全局加载中结束
			isStop && commonStore.loading && commonStore.loadingStop();
			return res;
		}
	).catch((error) => {
		commonStore.showMsg && commonStore.showMsg('error', `${error.message || 'request failed'}`);
		//全局加载中结束
		commonStore.loading && setTimeout(() => { commonStore.loadingStop(); }, 500);
		// throw error;
	})
}
