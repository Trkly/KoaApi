const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型(Model Permission -> 表 permissions)
const Permission = seq.define('permissions', {
  // id 会被sequelize自动创建, 管理
  mark: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '权限标识'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '权限名称'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '权限描述'
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '类型： 1-菜单，2-按钮'
  }
})



module.exports = Permission