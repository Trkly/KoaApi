const userRouter = require('../router/user.route')
const pexlesRouter = require('../router/pexles.route')
const userManageRouter = require('../router/user-manage.route')
const roleRouter = require('../router/role.route')
const permissionRouter = require('../router/permission.route')
const articleRouter = require('../router/article.route')
const Koa = require('koa')
const { koaBody } = require('koa-body')
const errHandler = require('./errHandler')
const app = new Koa()



// 中间件：封装返回数据
app.use(async (ctx, next) => {
    try {
        // 执行后续中间件或路由处理
        await next();

        // 判断状态码，处理不同的情况
        if (ctx.response.status === 404) {
            // 如果状态码为 404，表示未找到资源
            ctx.body = { status: "error", message: "Not Found" };
        } else {
            // 其他情况下，正常返回数据
            ctx.body = { status: "success", data: ctx.body };
        }
    } catch (error) {
        // 处理异常情况
        console.error("Caught an error:", error);
        ctx.status = 500;
        ctx.body = { status: "error", message: "Internal Server Error" };
    }
})

app.use(koaBody())
app.use(userRouter.routes())
app.use(pexlesRouter.routes())
app.use(userManageRouter.routes())
app.use(roleRouter.routes())
app.use(permissionRouter.routes())
app.use(articleRouter.routes())
// 统一的错误处理
app.on('error', errHandler)
module.exports = app