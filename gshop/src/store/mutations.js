import {
  RECEIVE_CHALLENGE_INFO,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from './mutation-types'
// [方法名](state,{param})
export default {
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_CHALLENGE_INFO] (state, {challenge}) {
    state.challenge = challenge
  }
}
