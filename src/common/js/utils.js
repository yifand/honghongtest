export function fixWaveLine(text) {
  // 将所有 ~ 替换为 \~ 转义符
  return text.replace(/~/g, '\\~')
}