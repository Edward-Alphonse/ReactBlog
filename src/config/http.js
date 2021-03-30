import axios from 'axios'
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'

const API = {
  ROOT: process.env.NODE_ENV === 'development' ? '/' : 'https://blog.iwaterlc.com'
}
axios.defaults.baseURL = API.ROOT
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  NProgress.start()
  return config
})

axios.interceptors.response.use(function (config) {
  NProgress.done()
  return config
})




class Api {
  constructor(name) {
    this.scheme = "http"
    this.host = "127.0.0.1"
    this.port = 5000
    this.name = name;
  }

  url() {
    return this.scheme + "://" + this.host + ":" + this.port + this.name;
  }
}

//auth
Api.login = new Api("/auth/login")
Api.register = new Api("/auth/register")
Api.logout = new Api("/auth/logout")
Api.changePassword = new Api("auth/change-password")
Api.profile = new Api("/profile/main")
Api.blogs = new Api("/blog/list")
Api.tags = new Api("/blog/tags")
Api.blogDetail = new Api("/blog/detail")

//posts
Api.getPosts = new Api("/posts")

Object.freeze(Api);

function encodeURL(url, params) {
  if (params == null) {
    return url
  }

  return url += '?' + Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + `=` + encodeURIComponent(params[key])
    })
    .join(`&`)
}

export { Api, encodeURL }


// import { encodeURL } from "./consts";

class net {
  async get(url, params) {
    // let myHeaders = new Headers({
    // 'Access-Control-Allow-Origin': '*',
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json'
    // });

    url = encodeURL(url, params)
    return fetch(url, {
      method: 'GET',
      // headers: myHeaders,
      mode: 'cors',
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then((response) => {
      var json = response.json()
      return json
    }).catch((error) => {
      console.log(error)
      return {
        "status": -1,
        "message": error.message
      }
    }).finally(() => {
      console.log("request done")
    })
  }

  async post(url, params) {
    return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify(params),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      console.log("----------++++", error)
      throw error
    }).finally((a) => {
      // console.log("----1")
    })
  }
}

const Network = new net()

export { Network }