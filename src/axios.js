import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import _ from "lodash";

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    console.log(options.baseUrl)
    const instance = axios.create({
      baseURL: _.isEmpty(options.baseUrl)?config.baseUrl:options.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        if (token) {
          config.headers.token = token
        } else {
          // 重定向到登录页面
        }
        return config
      },

      error => {
        console.log('request:', error)
        return Promise.reject(error)
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }

        if (!data.status){
          alert(data.msg);
        }
        return data
      },
      err => {
        if (err && err.response) {
          err.message = '请求错误'
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}

export const post = (path, data) => {
  let z = {
    url: '/'+path,
    method: 'post',
    baseUrl: config.baseUrl,
    data: data
  }
  return axios(z)
};
