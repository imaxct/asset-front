import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { canTurnTo } from '@/libs/util'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next()
  else next({ replace: true, name: 'login' })
}
router.beforeEach((to, from, next) => {
  if (!store.state.user.token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!store.state.user.token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (store.state.user.token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到homeName页
    })
  } else {
    if (store.state.user.token) {
      turnTo(to, store.state.user.roleId, next)
    } else {
      next({
        name: 'login'
      })
    }
  }
})

export default router
