const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型(Model Article -> 表 article)
const Article = seq.define('article', {
  ranking: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: '文章顺序'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '文章标题'
  },
  articleContent: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '文章内容'
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '文章作者'
  },
  publicDate: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '发布时间'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '文章描述'
  },
})

module.exports = Article