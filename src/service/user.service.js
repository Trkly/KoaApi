const User = require('../model/user.model')

class UserService {
    async insertUser(username, password, avatar, mobile, roleId) {
        console.log('来执行插入了', roleId)
        const res = await User.create({
            username: username,
            password: password,
            avatar: avatar,
            mobile: mobile,
            roleId: roleId
        })
        return res.dataValues
    }
    async createUser(username, password) {
        // 插入数据
        // await表达式: promise对象的值
        const res = await User.create({ username, password })
        // console.log(res)

        return res.dataValues
    }

    async getUerInfo({ id, username, password }) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'avatar', 'roleId'],
            where: whereOpt,
        })

        return res ? res.dataValues : null
    }

    async getUserList({ page, size }) {
        /**
         * page: 页码
         * size: 每条页数
         */
        const res = User.findAndCountAll({
            attributes: ['id', 'roleId', 'username', 'mobile', 'avatar'],
            offset: (page - 1) * size,
            limit: +size,
            raw: true
        })
        return res
    }

    async getAllUserList() {
        const res = await User.findAndCountAll({
            attributes: ['id', 'username', 'mobile', 'avatar', 'roleId'],
            raw: true
        })
        return res
    }

    async deleteUserById({ id }) {
        await User.destroy({
            where: {
                id: id
            }
        })
    }

    async setRoleIdByUserId({ id, roleId }) {
        const user = await User.findByPk(id)
        if (user) {
            user.roleId = roleId
            await user.save()
        }
    }
}

module.exports = new UserService()