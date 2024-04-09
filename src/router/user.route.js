const Router = require('koa-router')

const {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, getProfile, getFeature } = require('../controller/user.controller')
const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 获取用户信息接口
router.get('/profile', auth, getProfile)

// 获取项目功能
router.get('/feature', getFeature)
module.exports = router