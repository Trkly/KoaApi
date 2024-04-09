const Article = require('../model/article.model')
const dayjs = require('dayjs')
class ArticleService {
  async getAllArticleList({ page, size }) {
    /**
     * page: 页码
     * size: 每条页数
     */
    const res = await Article.findAndCountAll({
      offset: (page - 1) * size,
      limit: +size,
      raw: true
    })
    return res
  }

  async delArticleById({ articleId }) {
    await Article.destroy({
      where: {
        id: articleId
      }
    })
  }

  async findArticleIdByRankings({ array }) {

    const res = await Article.findAll({
      where: {
        ranking: array
      }
    })
    const resIds = res.map(item => item.id)
    return resIds
  }

  async updateRankings({ resIds, endArray }) {
    return Promise.all(resIds.map((id, index) => {
      // 对于每个文章编号，更新它的ranking
      return Article.update({ ranking: endArray[index] },
        { where: { id: id } }
      )
    }))
  }

  async insertNewArticle({ title, content, author }) {
    // 生成当前时间的时间戳
    const timestamp = dayjs().valueOf()
    console.log('timestamp==', timestamp)
    const res = await Article.create({
      title: title,
      articleContent: content,
      publicDate: timestamp,
      author: author
    })
    const { id } = res.dataValues

    console.log('插入后的结果是==', res)
    await Article.update({
      ranking: id
    }, {
      where: { id: id }
    }
    )
    // return res.dataValuesewrew
  }

  async getArticleDetailByArticleId({ id }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    const res = await Article.findOne({
      where: whereOpt,
      raw: true
    })
    return res
  }

  async setArticleByArticleId({ id, title, content }) {
    await Article.update(
      {
        title: title,
        articleContent: content
      }, {
      where: { id: id }
    }
    )
  }
}

module.exports = new ArticleService()