import _ from 'lodash'

export const timeFormat = (value, type) => {
  if (!value) return ''
  let result = ''
  const date = new Date(value)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')

  if (type === 'YMD') {
    result = year + '-' + month + '-' + day
  } else if (type === 'YMDHMS') {
    result =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type === 'YMDTHMS') {
    result =
      year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second
  } else if (type === 'YMDHM') {
    result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  } else if (type === 'HMS') {
    result = hour + ':' + minute + ':' + second
  } else if (type === 'HM') {
    result = hour + ':' + minute
  } else if (type === 'YM') {
    result = year + '-' + month
  } else if (type === 'YMD+++') {
    result = year + '-' + month + '-' + day + ' 00:00:00'
  } else if (type === 'YMD---') {
    result = year + '-' + month + '-' + day + ' 23:59:59'
  }
  return result
}

export const textEllipsis = (val, len) => {
  if (val) {
    if (val.length > len) return val.substr(0, len) + '...'
    return val
  }
  return ''
}
export const transText = (val, obj) => {
  if (_.isEmpty(obj)) return '-'
  const rst = obj.filter((k) => {
    return k.value == val; //eslint-disable-line
  })
  return rst.length > 0 ? rst[0].label : val
}
// 到期时间
export const transExpirationData = (val) => {
  if (val) {
    const date = val.substring(0, 19).replace(/-/g, '/')
    const nowTime = new Date().getTime()
    const exTime = new Date(date).getTime()
    if (exTime < nowTime) {
      return val + '<span class="icon-red">（已到期）</span>'
    } else if (exTime - nowTime < 7 * 24 * 60 * 60 * 1000) {
      return val + '<span class="icon-yellow">（即将到期）</span>'
    } else {
      return val
    }
  } else {
    return ''
  }
}

// 是否到期
export const isTransExpirationData = (val) => {
  if (val) {
    const date = val.substring(0, 19).replace(/-/g, '/')
    const nowTime = new Date().getTime()
    const exTime = new Date(date).getTime()
    if (exTime < nowTime) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
export const time2Unit = (val) => {
  try {
    if (!_.isNumber(val) && _.isEmpty(val)) return ['', '']
    const timeStr = calcTime(val)
    const len = timeStr.length
    const time = timeStr.substr(0, len - 1)
    const unitStr = timeStr.substr(-1, 1)
    let unit = 1
    if (unitStr === '天') unit = 86400
    if (unitStr === '时') unit = 3600
    if (unitStr === '分') unit = 60
    if (unitStr === '秒') unit = 1
    return [time, unit]
  } catch {
    return ''
  }
}