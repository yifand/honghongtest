import i18n from '@/i18n'
export function fixWaveLine(text) {
  // 将所有 ~ 替换为 \~ 转义符
  return text.replace(/~/g, '\\~')
}

/**
 * 密码复杂度校验：至少8位，必须同时包含字母和数字
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
  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    callback(new Error(i18n.t('password_format')))
    return
  }
  callback()
}