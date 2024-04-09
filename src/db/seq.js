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
    timezone: '+08:00', // 时区，如果没有设置，会导致数据库中的时间字段与中国时区时间相差8小时
    // 解决中文输入问题
    define: {
        timestamps: false, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
        paranoid: false, // 是否自动创建deletedAt字段
        underscored: true, // 开启下划线命名方式，默认是驼峰命名
        freezeTableName: true, // 禁止修改表名
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8mb4_general_ci'
        }
    }
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