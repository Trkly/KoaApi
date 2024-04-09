const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型(Model User -> 表 users)
const User = seq.define('users', {
    // id 会被sequelize自动创建, 管理
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        comment: '角色ID'
    },
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: '名称'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '密码'
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: true,
        comment: '用户联系方式'
    },
    avatar: {
        type: DataTypes.STRING(255),
        defaultValue: 'http://img.92fa.com/pic/TX1715_01.jpg',
        comment: '用户头像'
    },
    disable: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否禁用：0-否，1-是'
    },
    loginAddress: {
        type: DataTypes.STRING(255),
        comment: '登录详细地址'
    }
})

// 强制同步数据库(创建数据表)
// User.sync()
//     .then(() => {
//         console.log('Database and tables synced successfully')
//     })
//     .catch(err => {
//         console.error('Error syncing database and tables:', err)
//     })
module.exports = User