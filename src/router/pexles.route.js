const Router = require('koa-router')

// 路由前缀
const router = new Router({ prefix: '/pexles' })

/**
 * 获取图片数据列表
 */
router.get('/list', async (ctx)=>{
    console.log(ctx)
    ctx.body={
            list:[
                {
                    _id: '001',
                    author: 'ZZK',
                    authorLike: '',
                    avatar: 'https://pic.imgdb.cn/item/65bb8d4b871b83018ae000d9.jpg',
                    id:'001',
                    photo: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoDownLink:'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoHeight:625,
                    photoLink: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoType:'jpg',
                    tags: ['all', 'home', 'desire', 'pets'],
                    title:'图片数据来自pexels'
                },
                {
                    _id: '002',
                    author: 'ZZK',
                    authorLike: '',
                    avatar: 'https://pic.imgdb.cn/item/65bb8d4b871b83018ae000d9.jpg',
                    id:'002',
                    photo: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoDownLink:'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoHeight:625,
                    photoLink: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoType:'jpg',
                    tags: ['all', 'home', 'desire', 'pets'],
                    title:'图片数据来自pexels'
                },
                {
                    _id: '002',
                    author: 'ZZK',
                    authorLike: '',
                    avatar: 'https://pic.imgdb.cn/item/65bb8d4b871b83018ae000d9.jpg',
                    id:'002',
                    photo: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoDownLink:'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoHeight:625,
                    photoLink: 'https://pic.imgdb.cn/item/65bb8d89871b83018ae0fdce.jpg',
                    photoType:'jpg',
                    tags: ['all', 'home', 'desire', 'pets'],
                    title:'图片数据来自pexels'
                }
            ]
    }
})

module.exports = router