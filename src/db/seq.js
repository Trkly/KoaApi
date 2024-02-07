const { Sequelize } = require('sequelize')
/**
 * MYSQL_HOST: 服务器ip
 * MYSQL_PORT: mysql端口号
 * MYSQL_USER：mysql用户名
 * MYSQL_PWD：mysql密码
 * MYSQL_DB：数据库名称
 */
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB,
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
})

seq
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log('数据库连接失败', err)
    })

module.exports = seq