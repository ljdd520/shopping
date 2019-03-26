/* eslint-disable camelcase */
/*
*Action:通过操作mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_CHALLENGE_INFO,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from './mutation-types'
import {
  user_logout,
  reqUserInfo,
  reqGetChallenge
} from '../api'
export default {
  // 同步记录用户的信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步登出
  async logout ({commit}) {
    let data
    const result = user_logout()
    await result.then(response => {
      data = response.data
    })
    console.log(data)
    if (data.status === 10007) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取用户的信息
  async getUserInfo ({commit}) {
    let data
    const result = reqUserInfo()
    await result.then(response => {
      data = response.data
    })
    console.log(data)
    if (data.code === 0) {
      const userInfo = data.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步获取题目信息
  async getChallenge ({commit}) {
    let result = await reqGetChallenge()
    // 获取数据成功
    if (result.status === 200) {
      const challenge = result.data
      commit(RECEIVE_CHALLENGE_INFO, {challenge})
    }
  },
  // 清除用户信息
  flashUserInfo ({commit}) {
    commit(RESET_USER_INFO)
  }
}
