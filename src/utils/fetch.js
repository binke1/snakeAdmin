import axios from "axios";
import {Message, MessageBox} from "element-ui";
import store from "../store";
import {encodeBasic64, getToken, getUserUuid, removeToken, removeUserUuid} from "@/utils/auth";
// Create an axios instance

const service = axios.create({
  baseURL: process.env.BASE_API,  // api base_url
  timeout: 100000                 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  store.dispatch('openLoading')
  var loginUrl = config.baseURL + 'login'
  var registerUrl = config.baseURL + 'register'

  if (config.url == registerUrl) {
    removeToken()
    removeUserUuid()
    return config
  }
  // if (config.url == loginUrl) {
  if (config.url.indexOf('login') > -1) {
    alert(111)
    const username = config.data?config.data.username?config.data.username:undefined:undefined
    const password = config.data?config.data.password?config.data.password:undefined:undefined
    var credentials = 'Basic ' + encodeBasic64(username + ':' + password)
    config.headers.common['Authorization'] = credentials
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  if (store.getters.token) {
    var newParams = {
      "access_token": getToken(),
      'uuid': getUserUuid()
    }
    if(config.params == null) {
      config.params = newParams
    }else {
      config.params = Object.assign(config.params, newParams)
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    /**
     * if code is not 20000 ,will throw a exception
     */
    const res = response.data;
    if (res.code !== 20000) {
      // store.dispatch('closeLoading')
      if (res.errors != null && res.errors != 'undefined') {
        let error = res.errors[0]
        console.log(error)

        Message({
          message: error.description,
          type: 'error',
          duration: 5 * 1000
        })

        if (error.code === 50008 || error.code === 50012 || error.code === 50014){
          MessageBox.confirm('You have logout，you can stay current page ，or login again', 'confirm logout', {
            confirmButtonText: 'Login again',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('FedLogOut').then(() => {
              location.reload()
            })
          })
        }
      }

      const contentType = response.headers['content-type'];
      if (contentType == 'application/vnd.ms-excel;charset=UTF-8') {
        return response
      }
      return Promise.reject('error')
    } else {
      // store.dispatch('closeLoading')
      return response
    }
  },
  error => {
    // store.dispatch('closeLoading')
    console.log('err' + error)// for debug
    //401 go to login page
    if (error.response != null && error.response != 'undefined') {
      if (error.response.request != null && error.response.request != 'undefined') {
        if (error.response.request.status == 401) {
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        }
      }
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
