const Roles = require('../model/roles.model')

class RolesService {
  async getRoleByRoleId({ roleId }) {
    const whereOpt = {}
    roleId && Object.assign(whereOpt, { id: roleId })
    const res = await Roles.findOne({
      attributes: ['id', 'name'],
      where: whereOpt,
      raw: true
    })
    // console.log('res===', res)
    return res
  }

  async getRoleIdByRoleName({ roleName }) {
    const whereOpt = {}
    roleName && Object.assign(whereOpt, { name: roleName })
    const res = await Roles.findOne({
      attributes: ['id'],
      where: whereOpt,
      raw: true
    })
    // console.log('res===', res)
    return res
  }

  async getRoleList() {
    const res = await Roles.findAll({
      attributes: ['id', 'name', 'desc'],
      raw: true
    })
    return res
  }
}

module.exports = new RolesService()