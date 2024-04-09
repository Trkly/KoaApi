const { DataTypes } = require('sequelize')
const seq = require('../db/seq')


const RolePermissions = seq.define('role_permissions', {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    comment: '角色ID'
  },
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    comment: '权限ID'
  }
})

RolePermissions.primaryKeyAttributes = ['roleId', 'permissionId']

module.exports = RolePermissions