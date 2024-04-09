const { getRoleList } = require('../service/roles.service')
const { getPermissionsByRoleId, delPermissionByRoleId, addPermissionByRoleId } = require('../service/rolePermission.service')
class RoleController {
  async getAllRoleList(ctx, next) {
    const res = await getRoleList()
    ctx.body = {
      code: 0,
      role: '获取所有角色列表成功',
      result: res
    }
  }

  async getRolePermission(ctx, next) {
    const { roleId } = ctx.query
    console.log('获取到的角色id是', roleId)
    const res = await getPermissionsByRoleId({ roleId })
    const permissionLst = res.map(item => item.permissionId)
    console.log('获取到的角色权限列表是==', permissionLst)
    ctx.body = {
      code: 0,
      message: '获取角色权限成功',
      result: permissionLst
    }
  }

  async distributePermission(ctx, next) {
    console.log('获取到的请求体是==', ctx.request.body)
    const { roleId, permissions } = ctx.request.body
    const rLst_my = await getPermissionsByRoleId({ roleId })

    const rLst = rLst_my.map(item => item.permissionId)
    // 返回不在最终权限列表中的，就是要删除的权限
    const delLst = rLst.filter(item => {
      return !permissions.includes(item)
    })
    // 返回不在最开始权限列表中的，就是要增加的权限
    const addLst = permissions.filter(item => {
      return !rLst.includes(item)
    })
    console.log('permissions==', typeof permissions)
    console.log('delLst==', delLst)
    console.log('addLst==', addLst)
    console.log('rLst==', rLst)
    await delPermissionByRoleId({ roleId, delLst })
    await addPermissionByRoleId({ roleId, addLst })
    ctx.body = {
      code: 0,
      message: '角色权限配置成功',
      result: null
    }
  }
}

module.exports = new RoleController()