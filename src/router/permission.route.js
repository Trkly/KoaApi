const Router = require('koa-router')
const { getAllPermissionList } = require('../controller/permission.controller')
// 路由前缀
const router = new Router({ prefix: '/permission' })

router.get('/list', getAllPermissionList)

// 导出接口
module.exports = router