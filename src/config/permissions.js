import PermitHelper from './utils/PermitHelper'
import routes from './routes'

const permitHelper = new PermitHelper()

// 路由权限对象

const ROUTE = permitHelper.getRoutePermits(routes)


// 操作权限对象
const OPERATION = permitHelper.completePermits({
    USER_ADD: { id:1, desc: '新增用户'},
    USER_EDIT: { id:2, desc: '编辑用户' },
})

export default {
    ROUTE,
    OPERATION,
}
