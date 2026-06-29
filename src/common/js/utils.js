import i18n from '@/i18n'
export function fixWaveLine(text) {
  // 将所有 ~ 替换为 \~ 转义符
  return text.replace(/~/g, '\\~')
}

/**
 * 账号/用户名格式校验：不能包含中文和空格
 * @param {string} value
 * @param {Function} callback Element UI 校验回调
 */
export function validateAccountNoChineseAndSpace(value, callback) {
  if (!value) {
    callback()
    return
  }
  if (/[\u4e00-\u9fa5]/.test(value)) {
    callback(new Error(i18n.t('no_chinese')))
    return
  }
  if (/\s/.test(value)) {
    callback(new Error(i18n.t('no_space')))
    return
  }
  callback()
}

/**
 * 密码复杂度校验：至少8位，必须同时包含字母和数字，可包含特殊符号，不能包含中文和空格
 * @param {string} value
 * @param {Function} callback Element UI 校验回调
 * @param {object} t i18n 实例或翻译函数
 */
export function validatePasswordComplexity(value, callback, t) {
  if (!value) {
    callback()
    return
  }
  if (value.length < 8) {
    callback(new Error(i18n.t('password_min_length')))
    return
  }
  if (/[\u4e00-\u9fa5]/.test(value)) {
    callback(new Error(i18n.t('no_chinese')))
    return
  }
  if (/\s/.test(value)) {
    callback(new Error(i18n.t('no_space')))
    return
  }
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    callback(new Error(i18n.t('password_format')))
    return
  }
  callback()
}
