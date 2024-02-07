const { createUser, getUerInfo } = require('../service/user.service')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const { username, password } = ctx.request.body

        // 合法性
        if (!username || !password) {
            console.error('用户名或密码为空', ctx.request.body)
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '用户名或密码为空',
                result: '',
            }
            return
        }
        // 合理性
        if (await getUerInfo({username})) {
            ctx.status = 409
            ctx.body = {
                code: '10002',
                message: '用户已经存在',
                result: '',
            }
            return
        }
        // 2. 操作数据库
        const res = await createUser(username, password)
        console.log('用户注册操作数据库结果:',res)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                username: res.username,
            },
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body

        // 1. 获取用户信息(在token的payload中, 记录id, username, is_admin)
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            const { password, ...res } = await getUerInfo({ username })

            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    // { expiresIn: '1d' }--Token过期时间为一天
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }
}

module.exports = new UserController()