const Router = require('koa-router')

// 路由前缀
const router = new Router({ prefix: '/user-manage' })
const { userManageList, batchImportUsers, allUserManageList, getRoleId, delUser, updateRole } = require('../controller/user-manage.controller')
router.post('/list', userManageList)

router.get('/all-list', allUserManageList)

router.post('/batchImport', batchImportUsers)

router.get('/role', getRoleId)

router.get('/detail', async (ctx) => {
    console.log('正在获取用户详情')
    ctx.body = {
        code: 0,
        message: '用户详情获取成功',
        result: {
            role: [
                {
                    "id": "1",
                    "title": "超级管理员"
                }
            ],
            remark: [
                "超级管理员",
            ],
            experience: [
                {
                    startTime: "1567267200000",
                    endTime: "1688054400000",
                    title: "新疆大学",
                    desc: "软件工程"
                },
                {
                    startTime: "1693497600000",
                    endTime: "1767110400000",
                    title: "哈尔滨工业大学(威海)",
                    desc: "计算机技术"
                }
            ],
            id: "0",
            openTime: "1704038400000",
            username: "super-admin",
            title: "超级管理员",
            mobile: "13070454376",
            avatar: "http://img.92fa.com/pic/TX1715_01.jpg",
            gender: "男",
            nationality: "汉",
            address: "山东省威海市环翠区文化西路2号哈尔滨工业大学(威海)",
            talent: "乐观向上 积极进取",
            glory: "全国大学生数学建模竞赛国家二等奖"
        }
    }
})

router.get('/delete', delUser)

router.post('/update-role', updateRole)

// 导出接口
module.exports = router