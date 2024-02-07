const Router = require('koa-router')

// 路由前缀
const router = new Router({ prefix: '/list' })

router.get('/category',async (ctx)=>{
    ctx.body = {
        data: {
            key: 'value',
            category: [{ id: 'web_app_icon', name: 'UI/UX' },
                { id: 'design', name: '平面' },
                { id: 'illustration', name: '插画/漫画' },
                { id: 'photography', name: '摄影' },
                { id: 'games', name: '游戏' },
                { id: 'anime', name: '动漫' },
                {
                    id: 'industrial_design',
                    name: '工业设计'
                },
                {
                    id: 'industrial_design',
                    name: '建筑设计'
                },
                {
                    id: 'industrial_design',
                    name: '人文艺术'
                },
                {
                    id: 'industrial_design',
                    name: '家居/家装'
                }],
        }
    }
})

// 导出接口
module.exports = router