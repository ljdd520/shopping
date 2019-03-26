/* eslint-disable camelcase */
/*
* 与后台交互模块(ajax函数已经封装)
*/
import ajax from './ajax'
// const BASE_URL='http://localhost:4000'
const BASE_URL = '/api'
/**
 * 异步注册
 */
export const user_regist = (user_name, user_email, user_password) => { return ajax(BASE_URL + 'users/user_regist', {user_name, user_email, user_password}, 'POST') }

/**
*异步注册
 */
export const user_login = (user_email, user_password) => { return ajax(BASE_URL + 'users/user_login', {user_email, user_password}, 'POST') }

/**
 * 异步退出
 */
export const user_logout = () => { return ajax(BASE_URL + 'users/user_logout', {}, 'GET') }

/**
 * 获取用户的信息(根据会话)
 */
export const reqUserInfo = () => { return ajax(BASE_URL + '/users/userinfo') }

/**
 * 获取题目的信息
 */
export const reqGetChallenge = () => ajax(BASE_URL + '/users/challenge')

/**
 * 检测flag
 */
export const reqCheckFlag = (flag, id) => ajax(BASE_URL + 'users/checkFlag', {flag, id}, 'POST')

/**
 * 请求保存用户个人信息
 */
export const reqSaveProfile = (userName, radio, chinaName, detailAddress, description, id) => ajax(BASE_URL + 'users/saveProfile', {userName, radio, chinaName, detailAddress, description, id}, 'POST')

/**
 *用户信息的回显
 */
export const formEcho = (id) => ajax(BASE_URL + 'users/formEcho', {id})

export const reqGetHeader = ({id}) => ajax(BASE_URL + 'users/reqGetHeader', {id})

/**
 * 用户修改密码
 */
export const modifyPass = (oldPass, newPass, confirmPass, id) => ajax(BASE_URL + 'users/modifyPass', {oldPass, newPass, confirmPass, id}, 'POST')

/**
 * 用户上传文件
 */
export const uploadFile = (formData) => ajax(BASE_URL + 'users/userUpload', {formData}, 'POST')
