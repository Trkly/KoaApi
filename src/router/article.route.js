const Router = require('koa-router')
const { getArticleList, delArticle, editArticle, sortArticle, createArticle, articleDetail } = require('../controller/article.controller')
// 路由前缀
const router = new Router({ prefix: '/article' })

router.get('/list', getArticleList)

router.get('/delete', delArticle)

router.post('/sort', sortArticle)

router.post('/create', createArticle)

router.get('/detail', articleDetail)

router.post('/edit', editArticle)
// 导出接口
module.exports = router