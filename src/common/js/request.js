import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import i18n from '@/i18n'

// 获取 store 的辅助函数，避免循环引用
function getStore() {
  return require('@/store').default
}

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求队列（用于取消重复请求）
const pendingMap = new Map()

/**
 * 生成请求 key
 */
function getPendingKey(config) {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加请求到 pending
 */
function addPending(config) {
  const key = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pendingMap.has(key)) {
      pendingMap.set(key, cancel)
    }
  })
}

/**
 * 移除 pending 中的请求
 */
function removePending(config) {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    const cancel = pendingMap.get(key)
    cancel(i18n.t('req_duplicate_cancel'))
    pendingMap.delete(key)
  }
}

/**
 * 清除所有 pending 请求
 */
export function clearPending() {
  for (const [key, cancel] of pendingMap) {
    cancel(i18n.t('req_interrupted'))
    pendingMap.delete(key)
  }
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    removePending(config)
    addPending(config)

    const store = getStore()
    const token = store && store.state.token

    // 添加认证 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 添加语言头
    if (store && store.state.lang) {
      config.headers['Accept-Language'] = store.state.lang
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    removePending(response.config)

    const res = response.data

    // 如果后端返回的是二进制数据（如文件下载），直接返回
    if (response.config.responseType === 'blob') {
      return res
    }

    // 根据业务状态码判断
    // 假设后端约定 code === 200 为成功
    if (res.code !== undefined && res.code !== 200) {
      Message.error(res.message || i18n.t('req_failed'))

      // 登录过期
      if (res.code === 401) {
        const store = getStore()
        store.dispatch('logout')
        router.push('/login')
      }

      return Promise.reject(new Error(res.message || i18n.t('req_failed')))
    }

    return res
  },
  error => {
    if (error.config) {
      removePending(error.config)
    }

    // 取消请求不报错
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    let message = error.message || i18n.t('req_failed')

    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 400:
          message = i18n.t('req_param_error')
          break
        case 401:
          message = i18n.t('req_login_expired')
          getStore().dispatch('logout')
          router.push('/login')
          break
        case 403:
          message = i18n.t('req_no_permission')
          break
        case 404:
          message = i18n.t('req_not_found')
          break
        case 500:
          message = i18n.t('req_server_error')
          break
        case 502:
          message = i18n.t('req_gateway_error')
          break
        case 503:
          message = i18n.t('req_service_unavailable')
          break
        default:
          message = i18n.t('req_failed_status', { status })
      }
    } else if (error.request) {
      message = i18n.t('req_network_error')
    }

    Message.error(message)
    return Promise.reject(error)
  }
)



/**
 * 上传文件
 * @param {string} url
 * @param {FormData} formData
 * @param {function} onProgress
 */
export function upload(url, formData, onProgress) {
  return service.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percent)
      }
    }
  })
}

/**
 * 下载文件
 * @param {string} url
 * @param {object} params
 * @param {string} filename
 */
export function download(url, params = {}, filename = 'download') {
  return service
    .get(url, {
      params,
      responseType: 'blob'
    })
    .then(blob => {
      const link = document.createElement('a')
      const blobUrl = window.URL.createObjectURL(blob)
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    })
}

export default service
