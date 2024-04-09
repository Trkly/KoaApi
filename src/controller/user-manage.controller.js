const { getUserList, getAllUserList, insertUser, getUerInfo, deleteUserById, setRoleIdByUserId } = require('../service/user.service')
const { PASSWORD_DEFAULT } = require('../config/config.default')
const { getRoleByRoleId, getRoleIdByRoleName } = require('../service/roles.service')

class UserManageController {
  async userManageList(ctx, next) {
    const { page, size } = ctx.request.body
    // console.log('page==', page)
    // console.log('size==', size)
    const { rows, count } = await getUserList({ page, size })
    const userList = await Promise.all(rows.map(async item => {
      const { roleId, ...usLst } = item
      const { id, name } = await getRoleByRoleId({ roleId })
      return {
        role: [
          {
            id: id,
            title: name
          },

        ],
        ...usLst
      }
    }))
    // console.log('获取到的用户列表是==', rows)
    // console.log('userList==', userList)
    ctx.body = {
      code: 0,
      message: '获取用户列表成功',
      result: {
        list: userList,
        total: count,
        page: +page,
        size: +size
      }
    }
  }

  async allUserManageList(ctx, next) {
    const { rows, count } = await getAllUserList()
    console.log('allUserManageList-rows', rows)
    console.log('allUserManageList-count', count)
    const userList = await Promise.all(rows.map(async item => {
      const { roleId, ...usLst } = item
      const { id, name } = await getRoleByRoleId({ roleId })
      return {
        role: [
          {
            id: id,
            title: name
          },

        ],
        ...usLst
      }
    }))
    ctx.body = {
      code: 0,
      message: '所有列表获取成功',
      result: {
        list: userList,
        total: count
      }
    }
  }
  async batchImportUsers(ctx, next) {
    ctx.request.body.forEach(async element => {
      const { id, role, username, mobile, avatar } = element
      const roleName = JSON.parse(role)[0]
      const roleId = await getRoleIdByRoleName({ roleName })
      console.log('剩下的数据是==', roleId.id)
      await insertUser(username, PASSWORD_DEFAULT, avatar, mobile, roleId.id)
    })

    ctx.body = {
      code: 0,
      message: '批量导入用户成功',
      result: null
    }
  }

  async getRoleId(ctx, next) {
    const { id } = ctx.query
    const { roleId } = await getUerInfo({ id })
    const res = await getRoleByRoleId({ roleId })
    ctx.body = {
      code: 0,
      message: '获取角色成功',
      result: res
    }
  }

  async delUser(ctx, next) {
    const { id } = ctx.query
    console.log('要删除的id是==', id)
    await deleteUserById({ id })
    ctx.body = {
      code: 0,
      message: '删除成功',
      result: null
    }
  }

  async updateRole(ctx, next) {
    const { id, role } = ctx.request.body
    const roleId = role.id
    await setRoleIdByUserId({ id, roleId })
    ctx.body = {
      code: 0,
      message: '修改用户角色成功',
      result: null
    }
  }
}

module.exports = new UserManageController()