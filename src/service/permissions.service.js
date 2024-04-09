const Permissions = require('../model/permissions.model')

class PermissionsService {
  async getPermissionByPermissionId({ permissionId }) {
    const whereOpt = {}
    permissionId && Object.assign(whereOpt, { id: permissionId })

    const res = await Permissions.findOne({
      attributes: ['mark', 'type'],
      where: whereOpt,
      raw: true
    })
    // console.log('permissionId==', permissionId, '查询到的结果是', res)
    return res
  }

  async getPermissionList() {
    const res = await Permissions.findAll({
      raw: true
    })
    return res
  }


}
module.exports = new PermissionsService()