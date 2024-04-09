const Router = require('koa-router')
const { getAllRoleList, getRolePermission, distributePermission } = require('../controller/role.controller')
// 路由前缀
const router = new Router({ prefix: '/role' })

router.get('/list', getAllRoleList)
/**
 * 获取指定角色的权限
 */
router.get('/permission', getRolePermission)

router.post('/distribute-permission', distributePermission)
module.exports = router