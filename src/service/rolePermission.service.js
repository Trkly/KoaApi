const { Sequelize } = require('sequelize')
const RolePermission = require('../model/rolePermission.model')

class RolePermissionService {
  async getPermissionsByRoleId({ roleId }) {
    // console.log('getPermissionsByRoleId中的roleId==', roleId)

    const whereOpt = {}

    roleId && Object.assign(whereOpt, { roleId })

    const res = await RolePermission.findAll({
      attributes: ['roleId', 'permissionId'],
      where: whereOpt,
      raw: true
    })
    console.log('getPermissionsByRoleId的查询结果是==', res)
    return res
  }

  async delPermissionByRoleId({ roleId, delLst }) {
    await RolePermission.destroy({
      where: {
        roleId: {
          [Sequelize.Op.eq]: roleId //确保删除的为指定rolId
        },
        permissionId: {
          [Sequelize.Op.in]: delLst
        }
      }
    })
  }

  async addPermissionByRoleId({ roleId, addLst }) {
    const itemsToAdd = []
    addLst.forEach(element => {
      itemsToAdd.push({
        roleId: roleId,
        permissionId: element
      })
    })
    console.log('itemsToAdd==', itemsToAdd)
    await RolePermission.bulkCreate(itemsToAdd)
    console.log('批量增加成功')
  }
}

module.exports = new RolePermissionService()