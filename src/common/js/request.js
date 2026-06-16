import axios from 'axios'
import router from '@/router'
import i18n from '@/i18n'
import store from '@/store'
import { Message, MessageBox, Loading } from 'element-ui'

import {
  // LS_USERTOKEN,
  EXPIRED_TOKEN,
  TIMEOUT_NORMAL,
  TIMEOUT_LONG,
  MSG
} from '@/common/js/const'

const service = axios
service.defaults.headers.common['Content-Type'] =
  'application/json;charset=UTF-8'
service.defaults.timeout = TIMEOUT_NORMAL
service.defaults.withCredentials = true

service.interceptors.request.use(
  (config) => {
   
    // 为 diffaccountlist 相关接口（/ntripUser 和 account/company）添加 token
    const url = config.url || ''
    const isDiffAccountApi = url.includes('/ntripUser/') || url.includes('/account/company') || url.includes('/llm/')

    if (isDiffAccountApi &&store.states.token) {
      config.headers.token = store.state.token
    } else if (store.state.token) {
      // 其他接口使用 Authorization header
      config.headers.Authorization = store.state.token
    }

    return config
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    
    if (response.status === 200) {
      // 从响应头获取 token（登录接口返回的 token）
      // 注意：axios 会将响应头字段名转换为小写，所以优先使用小写字段名
      // 但为了兼容性，也检查其他可能的字段名格式
      const token = response.headers.token ||
                    response.headers.Token
      const authorization = response.headers.authorization ||
                            response.headers.Authorization
      
      if (token) {
        // 将 token 保存到 Vuex store 的 accessToken 中
        // SET_ACCESSTOKEN mutation 会同时保存到 state 和 sessionStorage
        store.commit('SET_TOKEN', token)
        // 调试日志（生产环境可删除）
        // console.log('Token saved from response header:', token)
      } else if (authorization) {
        store.commit('SET_TOKEN', authorization)
        // console.log('Authorization saved from response header:', authorization)
      }

      // 从响应头获取 role
      const role = response.headers.role || response.headers.Role
      if (role) {
        // 将 role 转换为数组（可能是"9"或"9,10"等逗号分隔的字符串）
        const roleStr = String(role)
        const roleArray = roleStr.split(',').map(r => r.trim()).filter(r => r)
        store.commit('SET_ROLE', roleArray)
      }

      // 从响应头获取 authoritys（权限列表，逗号分割的菜单code字符串）
      const authoritys = response.headers.authoritys || response.headers.Authoritys
      if (authoritys) {
        // 将authoritys转换为数组（可能是"All"或"Account,Area"等逗号分隔的字符串）
        const authoritysStr = String(authoritys)
        const authoritysArray = authoritysStr === 'ALL'
          ? ['All']
          : authoritysStr.split(',').map(a => a.trim()).filter(a => a)
        store.commit('SET_AUTHORITYS', authoritysArray)
      }

      // if (response.headers.passwordexpire) {
      //   store.commit('SET_UPDATEPSD', response.headers.passwordexpire)
      // }
   // 如果是文件下载（responseType 为 arraybuffer），返回完整的 response 对象
        // 或者 content-type 包含 excel、zip、csv 等文件类型
        const contentType = (response.headers['content-type'] || '').toLowerCase()
        const isFileDownload = response.config && response.config.responseType === 'arraybuffer'
        const isFileType = contentType.indexOf('excel') >= 0 ||
                          contentType.indexOf('zip') >= 0 ||
                          contentType.indexOf('csv') >= 0 ||
                          contentType.indexOf('txt') >= 0 ||
                          contentType.indexOf('octet-stream') >= 0

        if (isFileDownload || isFileType) {
          return response
        } else {
          if (response.data && response.data.code === EXPIRED_TOKEN) {
            store.dispatch('logout').then(() => {
              router.push({
                path: '/login'
              })
            })
            return response.data
          } else {
            return response.data
          }
        }
        } else {
          Promise.reject(response)
        }
        },
        (error) => {
          // console.log(error)
          if (error.response) {
            var status = error.response.status
            var msg = error.response.data.msg
            switch (status) {
              case 400:
                Message.error({
                  message: msg != null && msg !== '' ? msg : i18n.t('req_param_error'),
                  showClose: true
                })
                break;
              case 401:
                if (router.history.current.path.indexOf('/login') >= 0) {
                  Message.error({
                    message:
                      msg != null && msg !== ''
                        ? msg
                        : i18n.t('req_no_permission'),
                    showClose: true
                  })
                } else {
                  store.dispatch('logout').then(() => {
                    router.push({ path: '/login' })
                  })
                  MessageBox.alert(
                    '该账户已异地登录，请确认账户安全并重新登录',
                    '提示',
                    {
                      confirmButtonText: i18n.t('ok'),
                      type: 'warning'
                    }
                  ).then(() => {})
                }
                break
              case 404:
                Message.error({
                  message: i18n.t('req_not_found'),
                  showClose: true
                })
                break
              case 403:
                Message.error({
                  message: i18n.t('req_no_permission'),
                  showClose: true
                })
                break
              case 500:
                Message.error({
                  message: i18n.t('req_service_unavailable'),
                  showClose: true
                })
                break
                case 504:
                Message.error({
                  message: '网关连接超时！',
                  showClose: true
                })
                break
              default:
                Message.error({
                  message: MSG.SERVER_EXCEPTION,
                  showClose: true
                })
              }
              }
          return Promise.reject(error)
      }
    )
export const _getData = (
  _url,
  _data,
  _withLoading = false,
  _resFile = false
) => {
  let loadingInstance = {}
  if (_withLoading) {
    loadingInstance = Loading.service({
      lock: true,
      text: '请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.1)',
      customClass: 'cors-loading'
    })
  }
  return new Promise((resolve, reject) => {
    axios
      .get(
        _url,
        _data
          ? Object.assign(
              {
                params: _data || {}
              },
              _resFile
                ? {
                    responseType: 'arraybuffer',
                    timeout: TIMEOUT_LONG
                  }
                : {
                    timeout: TIMEOUT_NORMAL
                  }
            )
          : Object.assign(
              {
                data: _data || {}
              },
              _resFile
                ? {
                    responseType: 'arraybuffer',
                    timeout: TIMEOUT_LONG
                  }
                : {
                    timeout: TIMEOUT_NORMAL
                  }
            )
      )  .then((res) => {
          if (_withLoading) loadingInstance.close()
          // if (_url.endsWith('/login/getVerify')) return resolve(res)
          // else return resolve(res)
          return resolve(res)
        })
          .catch((err) => {
            if (_withLoading) loadingInstance.close()
            return reject(err.response)
          })
})
}

export const _postData = (
  _url,
  _data,
  _withLoading = false,
  _download = false,
  _import = false
) => {
  let loadingInstance = {}
  if (_withLoading) {
    loadingInstance = Loading.service({
      lock: true,
      text: '请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.1)',
      customClass: 'cors-loading'
    })
  }
  const contentType = _import
    ? 'application/x-www-form-urlencoded'
    : 'application/json;charset=UTF-8'
  return new Promise((resolve, reject) => {
    axios
      .post(
        _url,
        _data || {},
        _download
          ? {
              headers: {
                'Content-Type': contentType
              },
              responseType: 'arraybuffer',
              timeout: _download || _import ? TIMEOUT_LONG : TIMEOUT_NORMAL
            }
          : {
              headers: {
                // 'bizDto': `{"eid": "", "accountId": "${sessionStorage.getItem(LS_USERID) || ''}"}`,
                'Content-Type': contentType
              },
              timeout: _download || _import ? TIMEOUT_LONG : TIMEOUT_NORMAL
            }
      )
  .then((res) => {
    if (_withLoading) loadingInstance.close()
    return resolve(res)
  })
  .catch((err) => {
    if (_withLoading) loadingInstance.close()
    return reject(err.response)
  })
})
}

export const _uploadFile = (
  _url,
  _file,
  _withLoading = false
) => {
  let loadingInstance = {}
  if (_withLoading) {
    loadingInstance = Loading.service({
      lock: true,
      text: '请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.1)',
      customClass: 'cors-loading'
    })
  }
  const formData = new FormData()
  formData.append('file', _file)
  return new Promise((resolve, reject) => {
    axios
      .post(
        _url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: TIMEOUT_LONG
        }
      )
      .then((res) => {
        if (_withLoading) loadingInstance.close()
        return resolve(res)
      })
      .catch((err) => {
        if (_withLoading) loadingInstance.close()
        return reject(err.response)
      })
  })
}

/**
 * 流式请求通用方法
 * @param {string} url 请求地址
 * @param {object} options 请求配置
 * @param {function} onDataReceived 数据接收回调
 * @param {function} onProgress 进度回调（可选）
 * @param {function} onComplete 完成回调（可选）
 * @returns {Promise} 返回包含取消方法的Promise
 */
export function streamFetch (
  url,
  data = {},
  onDataReceived,
  onComplete
) {

  const controller = new AbortController()
  const signal = controller.signal
  // 合并请求选项
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    token:  store.state.token,
    body: JSON.stringify(data),
    signal
  }

  // 返回Promise以便错误处理
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status} ${response.statusText}`)
      }
      // 获取可读流
      const reader = response.body.getReader()
      const chunks = []

      // 读取流数据
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          // 流读取完成
          if (onComplete) onComplete()
          break
        }
        // 处理数据块
        chunks.push(value)
        if (onDataReceived) {
          onDataReceived(value, controller)
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        reject(error)
      }
    }
  }).then((result) => ({
    result,
    abort: () => controller.abort()
  }))
}

/**
 * Vue2 GET 流式SSE请求封装
 * @param {String} url 请求地址
 * @param {Object} params url参数
 * @param {Object} headers 请求头
 * @param {Function} onMessage 分片回调
 * @param {Function} onEnd 结束回调
 * @param {Function} onError 错误回调
 */
export function streamGetRequest({
  url,
  params = {},
  headers = {},
  onMessage,
  onEnd,
  onError
}) {
  const urlParams = new URLSearchParams(params);
  const fullUrl = `${url}?${urlParams.toString()}`;
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: "text/event-stream",
      token:  store.state.token,
      ...headers
    },
    mode: 'cors',
    credentials: 'omit'
  };

  let reader = null;
  const abortController = new AbortController();
  fetchOptions.signal = abortController.signal;

  // 发起请求
  fetch(fullUrl.toString(), fetchOptions)
    .then(async (res) => {
      // 状态码校验
      if (!res.ok) {
        throw new Error(`请求失败，状态码：${res.status}`);
      }
      // 获取二进制流读取器
      reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();        
        if (done) {
          // 流读取完毕
          onEnd && onEnd(buffer);
          break;
        }        
        // 二进制转文本
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        // 每拿到一段内容触发回调渲染
        onMessage && onMessage(chunk, buffer);
      }
    })
    .catch(err => {
      console.log({err});
      // 中断/网络/跨域错误捕获
      if (err.name !== 'AbortError') {
        onError && onError(err);
      }
    });

  return {
    abort: () => {
      // abortController&&abortController.abort();
      reader && reader.cancel();
    }
  };
}
