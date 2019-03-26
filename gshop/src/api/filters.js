/**
 *全局配置，axios跨域请求拦截器
 */
import axios from 'axios'
import Storage from '../util/storage'
import {Message, MessageBox} from 'element-ui'

// 创建一个axios对象
const service = axios.create({
  // 连接超时5秒
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  // 必须携带token
  // config => {
  //   if (Storage.localGet('token')) {
  //     config.headers['X-Token'] = Storage.localGet('token')
  //   }
  //   return config
  // },
  // error => {
  //   console.log(error)
  //   Promise.reject(error)
  // }
  config => {
    if (Storage.localGet('token')) {
      config.headers['X-Token'] = Storage.localGet('token')
    }
    return Promise.resolve(config)
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  // response => {
  //   const res = response.data
  //   console.log(res)
  //   if (res.status !== 200) {
  //     if (res.status === 403) {
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确认登出', {
  //         confirmButtonText: '重新登陆',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         Storage.localRemove('token')
  //       }).then(() => {
  //         this.$store.dispatch('flashUserInfo')
  //       }).then(() => {
  //         this.$router.replace('/login')
  //       })
  //     }
  //   } else {
  //     return response
  //   }
  // },
  // error => {
  //   console.log('err' + error)
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
  response => {
    const res = response.data
    console.log(res)
    if (res.status !== 200) {
      if (res.status === 403 || res.status === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确认登出', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Storage.localRemove('token')
        }).then(() => {
          this.$store.dispatch('flashUserInfo')
        }).then(() => {
          this.$router.replace('/login')
        })
      }
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
