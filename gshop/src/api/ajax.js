/*
ajax请求函数模块
 */
import axios from 'axios'
// import service from './filters'
import Storage from '../util/storage'
/**
 * 向外部暴漏一个函数 ajax
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求方法，默认为GET
 */
export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    let header = {'Auth': Storage.localGet('token')}

    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.indexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      // noinspection JSAnnotator
      promise = axios.get(url, {headers: header})
      // promise = service.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data, {headers: header})
      // promise = service.post(url, data)
    }
    promise.then(response => {
      // 成功回调resolve()
      resolve(response)
    })
      .catch(error => {
        // 失败回调
        reject(error)
      })
  })
}
