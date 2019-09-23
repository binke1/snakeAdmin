import qs from 'qs';
import fetch from '@/utils/fetch'
import {encodeBasic64, removeToken} from "@/utils/auth";

export function login(username, password) {
  var credentials = 'Basic ' + encodeBasic64(username + ':' + password);
  return fetch({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      'grant_type':'password',
      'username':username,
      'password' : credentials
    })
  })
}

export function logout() {
  return fetch({
    url: '/logout',
    method: 'get'
  })
}

export function getInfo() {
  return fetch({
    url: '/users/getInfo',
    method: 'get'
  })
}
//注册成功后获取验证码
export function sendLoginSmPhoneNumBtoC(phoneNum) {
  return fetch({
    url: '/sendLoginSms/' + phoneNum,
    method: 'get'
  })
}

export function getInfoBtoC() {
  return fetch({
    url: '/client/getInfo',
    method: 'get'
  })
}
