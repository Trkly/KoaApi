const { getAllArticleList, setArticleByArticleId, getArticleDetailByArticleId, delArticleById, findArticleIdByRankings, updateRankings, insertNewArticle } = require('../service/article.service')
class ArticleController {
  async getArticleList(ctx, next) {
    const { page, size } = ctx.query
    console.log('page==', page)
    console.log('size==', size)
    const { rows, count } = await getAllArticleList({ page, size })
    // 按照ranging升序排序
    rows.sort(function (a, b) {
      return parseInt(a.ranking) - parseInt(b.ranking)
    })
    console.log('rows==', rows)
    console.log('count==', count)
    ctx.body = {
      code: 0,
      message: '获取文章成功',
      result: {
        list: rows,
        total: count,
        page: +page,
        size: +size
      }
    }
  }

  async delArticle(ctx, next) {
    const { articleId } = ctx.query
    console.log('查询到的文章编号是==', typeof articleId)
    await delArticleById({ articleId })
    ctx.body = {
      code: 0,
      message: '删除文章成功',
      result: null
    }
  }

  async sortArticle(ctx, next) {
    console.log('获取到的排序是==', ctx.request.body)
    const { initRanking, finalRanking } = ctx.request.body
    console.log(typeof initRanking)
    const startRank = Math.min(parseInt(initRanking), parseInt(finalRanking))
    const endRank = Math.max(parseInt(initRanking), parseInt(finalRanking))
    let array = []
    for (let i = startRank; i <= endRank; i++) {
      array.push(i);
    }
    const resIds = await findArticleIdByRankings({ array })
    const endArray = []
    console.log('查询之后的文章编号是==', resIds)
    if (parseInt(initRanking) < parseInt(finalRanking)) {
      // 表明拖拽的文章ranking是变高的，那么他之后的文章(到他最终的排名文章之前)内的文章排名都进一位
      endArray.push(parseInt(finalRanking))
      for (let i = 1; i < array.length; i++) {
        endArray.push(array[i] - 1)
      }
    } else {
      for (let i = 0; i < array.length - 1; i++) {
        endArray.push(array[i] + 1)
      }
      endArray.push(parseInt(finalRanking))
    }
    console.log('修改之前的文章ranking是==', array)
    console.log('修改之后的文章ranking是==', endArray)
    await updateRankings({ resIds, endArray })
    ctx.body = {
      code: 0,
      message: '拖拽排序成功',
      result: null
    }
  }

  async createArticle(ctx, next) {
    console.log('查询的结果是==', ctx.request.body)
    const { title, content, author } = ctx.request.body
    await insertNewArticle({ title, content, author })
    ctx.body = {
      code: 0,
      message: '文章添加成功',
      result: null
    }
  }

  async articleDetail(ctx, next) {
    console.log('GET到的参数是==', ctx.query)
    const { id } = ctx.query
    const res = await getArticleDetailByArticleId({ id })
    console.log('查询到的文章详情是==', res)
    ctx.body = {
      code: 0,
      message: '获取文章详情成功',
      result: res
    }
  }

  async editArticle(ctx, next) {
    const { id, title, content } = ctx.request.body
    console.log('要编辑的文章信息是==', ctx.request.body)
    await setArticleByArticleId({ id, title, content })
    ctx.body = {
      code: 0,
      message: '编辑文章成功',
      result: null
    }
  }
}

module.exports = new ArticleController()