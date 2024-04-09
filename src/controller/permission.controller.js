const { getPermissionList } = require('../service/permissions.service')
class PermissionController {
  async getAllPermissionList(ctx, next) {
    console.log('NIHAO')
    const res = await getPermissionList()
    const menuPem = []
    const buttonPem = []
    res.forEach(item => {
      const { type, ...rst } = item
      if (type === 1) {
        menuPem.push(rst)
      } else if (type === 2) {
        buttonPem.push(rst)
      }
    })
    console.log('menuPem==', menuPem)
    console.log('buttonPem==', buttonPem)
    ctx.body = {
      code: 0,
      message: '获取权限列表成功',
      result: [
        {
          id: '一',
          name: '菜单权限',
          mark: 'menuPermission',
          desc: '下面是菜单级别的权限',
          children: menuPem
        },
        {
          id: '二',
          name: '按钮权限',
          mark: 'buttonPermission',
          desc: '下面是按钮级别的权限',
          children: buttonPem
        }
      ]
    }
  }
}

module.exports = new PermissionController()