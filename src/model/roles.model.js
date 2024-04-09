const { DataTypes } = require('sequelize')
const seq = require('../db/seq')


const Roles = seq.define('roles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '角色名称'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '角色描述'
  }
})


module.exports = Roles