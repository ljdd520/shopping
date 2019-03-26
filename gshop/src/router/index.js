import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Challenge from '../pages/Challenge/Challenge'
import Profile from '../pages/Profile/Profile'
import Ranking from '../pages/Ranking/Ranking'
import Trend from '../pages/Trend/Trend'
import Home from '../pages/Home/Home'
import Storage from '../util/storage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/challenge',
      component: Challenge,
      name: 'challenge',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      name: 'profile',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ranking',
      component: Ranking,
      name: 'ranking',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trend',
      component: Trend,
      name: 'trend',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = Storage.localGet('token')
  let tokenTime = Storage.localGet('tokenTime')
  tokenTime = (new Date().getTime() - tokenTime) / 1000 / 60 / 60
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断token是否存在
    if (Storage.localGet('token') === null) {
      this.$store.commit('flashUserInfo')
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      }, () => {
        this.$store.commit('flashUserInfo')
      })
    } else {
      if (token && tokenTime < 1) {
        next()
      } else {
        this.$store.commit('flashUserInfo')
        // 要进入的页面要登陆
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        }, () => {
          this.$store.commit('flashUserInfo')
        })
      }
    }
  } else {
    next()
  }
})

export default router
// 全局钩子函数
