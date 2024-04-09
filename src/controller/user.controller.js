const { createUser, getUerInfo } = require('../service/user.service')
const jwt = require('jsonwebtoken')
const { getPermissionsByRoleId } = require('../service/rolePermission.service')
const { getPermissionByPermissionId } = require('../service/permissions.service')
const { getRoleByRoleId } = require('../service/roles.service')
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
        if (await getUerInfo({ username: username })) {
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
        console.log('用户注册操作数据库结果:', res)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                username: res.username,
                avatar: res.avatar,
                title: res.title,
            },
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body
        console.log('我到这里了')
        // 1. 获取用户信息(在token的payload中, 记录id, username, is_admin)
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            const { password, ...res } = await getUerInfo({ username: username })
            console.log('用户登录成功！！！')
            console.log('用户的信息==', res)
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

    async getProfile(ctx, next) {
        // console.log('接收到的请求信息是==', ctx.state.user)
        const { username, id, roleId } = ctx.state.user

        try {

            const pst = await getPermissionsByRoleId({ roleId })
            const roles = getRoleByRoleId({ roleId })
            let menus = []
            let points = []
            await pst.forEach(async item => {
                const { permissionId } = item
                const { mark, type } = await getPermissionByPermissionId({ permissionId })
                if (type === 1) {
                    menus.push(mark)
                } else if (type === 2) {
                    points.push(mark)
                }
            })
            const res = await getUerInfo({ id: id, username: username })
            // console.log('menus==', menus)
            // console.log('points==', points)
            // console.log('数据库查询到的用户信息是==', res)
            // console.log('查询到的用户角色是==', roles)
            const roleLst = []
            roles.then(item => {
                const { id, name } = item
                roleLst.push({
                    id: id,
                    title: name
                })
            })
            ctx.body = {
                code: 0,
                message: '用户数据获取成功',
                result: {
                    role: roleLst,
                    id: res.id,
                    username: res.username,
                    avatar: res.avatar,
                    permission: {
                        menus: menus,
                        points: points
                    }
                }
            }
        } catch (err) {
            console.error('用户数据获取失败', err)
        }

    }

    async getFeature(ctx, next) {
        console.log('NIHAO')
        ctx.message = '请求成功'
        ctx.body = {
            data: [
                {
                    "title": "Vue3 + 全家桶",
                    "percentage": 100,
                    "content": "项目基于最新的<a target=\"_blank\" href=\"https://v3.cn.vuejs.org/guide/introduction.html\">vue3</a>全家桶进行开发，全面使用最新的的<a target=\"_blank\" href=\"https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md\">RFC script setup</a>语法标准，为你带来不一样的 vue3 开发体验"
                },
                {
                    "title": "Element-Plus",
                    "percentage": 100,
                    "content": "<a target=\"_blank\" href=\"https://element-plus.org/#/zh-CN\">Element Plus</a>，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。是 Element UI 的官方 vue 3 兼容版本"
                },
                {
                    "title": "vue-element-admin",
                    "percentage": 100,
                    "content": "<a target=\"_blank\" href=\"https://panjiachen.github.io/vue-element-admin-site/zh/guide/\">vue-element-admin</a> 是一个后台前端解决方案，它基于 vue 和 element-ui实现，并有用 70K 的 <a target=\"_blank\" href=\"https://github.com/PanJiaChen/vue-element-admin\">star</a>。<br />本项目使用最新 vue 技术对其进行了重构，并在其现有功能上进行了扩展，致力于为大家带来更加符合 <b>现代后台开发的前端技术解决方案</b>"
                },
                {
                    "title": "ESLint + Git Hooks",
                    "percentage": 100,
                    "content": "ESLint 对应编码规范，Git Hooks 对应 Git 规范。<br /> 想要开发出大厂标准的企业级项目，需要先从规范做起！"
                },
                {
                    "title": "架构设计",
                    "percentage": 100,
                    "content": "阿里前端 P7 岗被称为 《技术专家》，也有人喜欢叫他们为 “前端架构师”，既然被称为 “架构师” ，那么架构设计当然是不可缺少的一环咯"
                },
                {
                    "title": "权限验证（页面权限、功能权限、动态权限、权限配置）",
                    "percentage": 100,
                    "content": "全面的后台权限验证系统，实现了 <b>页面权限、功能权限、动态权限、权限配置</b> 等全方位的权限功能"
                },
                {
                    "title": "功能引导",
                    "percentage": 100,
                    "content": "对用户的功能引导"
                },
                {
                    "title": "可配置 + 收缩侧边栏",
                    "percentage": 100,
                    "content": "根据路由动态生成的 Menu 菜单，实现真正的 <b>配置 Menu</b>"
                },
                {
                    "title": "动态面包屑",
                    "percentage": 100,
                    "content": "动态生成的面包屑数据"
                },
                {
                    "title": "Tags View",
                    "percentage": 100,
                    "content": "便签快捷导航功能"
                },
                {
                    "title": "svg sprite 图标",
                    "percentage": 100,
                    "content": "自定义的 svg Icon 配合 el Icon 自动分配导入"
                },
                {
                    "title": "国际化",
                    "percentage": 100,
                    "content": "多语言的国际化功能实现"
                },
                {
                    "title": "动态换肤",
                    "percentage": 100,
                    "content": "主题更换功能，提供缓存实现"
                },
                {
                    "title": "页面搜索",
                    "percentage": 100,
                    "content": "根据路由配置自动化生成的页面搜索数据，无需手动配置"
                },
                {
                    "title": "excel 导出、导入",
                    "percentage": 100,
                    "content": "excel 表格的导入、导出实现"
                },
                {
                    "title": "zip 导入",
                    "percentage": 100,
                    "content": "页面数据导出为 zip "
                },
                {
                    "title": "富文本 + MarkDown 编辑器",
                    "percentage": 100,
                    "content": "常用的编辑器功能，包含 富文本编辑器 && MarkDown 编辑器"
                },
                {
                    "title": "动态表格 + 拖拽表格 + 内联编辑表格",
                    "percentage": 100,
                    "content": "表格列表的常见操作，多用于包含表格项的展示功能中。包括：动态表格 && 拖拽表格 && 内联编辑表格 "
                },
                {
                    "title": "统一错误处理",
                    "percentage": 100,
                    "content": "页面级的错误处理由 vue-router 统一处理。包含 401 和 404 的错误处理"
                },
                {
                    "title": "发布",
                    "percentage": 100,
                    "content": "构建与发布"
                },
                {
                    "title": "其他",
                    "percentage": 100,
                    "content": "除了以上功能之外，我们还实现了很多其他的功能，比如：CDN、动态的环境变量配置、懒加载、跨域等等"
                }
            ]
        }
    }
}

module.exports = new UserController()