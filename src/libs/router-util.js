/* eslint-disable */
/**
 * ①添
 * @@新增 定义初始化菜单
 */
import store from '@/store'
import { getToken, localSave, localRead } from '@/libs/util'
// import config from '@/config'
import { lazyLoadingCop } from '@/libs/tools'
import { getMockMenuData } from '@/api/data'
import Main from '@/components/main' // Main 是架构组件，不在后台返回，在文件里单独引入
import parentView from '@/components/parent-view' // parentView 是二级架构组件，不在后台返回，在文件里单独引入

var gotRouter
// 初始化路由
export const initRouter = () => {
  if (!getToken()) {
    return
  }
  return new Promise(resolve => {
    let antRouter = localRead('dynamicRouter');
    if (!antRouter) {
      getMockMenuData().then(res => {
        if (res.status === 200) {
          var routerData = res.data // 后台拿到路由
          localSave('dynamicRouter', JSON.stringify(routerData)) // 存储路由到localStorage
          gotRouter = filterAsyncRouter(routerData) // 过滤路由,路由组件转换
          store.commit('updateMenuList', gotRouter);
          gotRouter = dynamicRouterAdd()
          resolve(gotRouter)
        } else {
          console.log('请求失败')
        }
      })
    } else {
      gotRouter = dynamicRouterAdd()
      resolve(gotRouter)
    }
  })
}

// 加载路由菜单,从localStorage拿到路由,在创建路由时使用
export const dynamicRouterAdd = () => {
  let dynamicRouter = []
  let data = localRead('dynamicRouter')
  if (!data) {
    return dynamicRouter
  }
  dynamicRouter = filterAsyncRouter(JSON.parse(data))
  return dynamicRouter
}

// @函数: 遍历后台传来的路由字符串，转换为组件对象
export const filterAsyncRouter = (asyncRouterMap) => {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Main') { // Main组件特殊处理
        route.component = Main
      } else if (route.component === 'parentView') { // parentView组件特殊处理
        route.component = parentView
      } else {
        // route.component = _import(route.component)
        route.component = lazyLoadingCop(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}