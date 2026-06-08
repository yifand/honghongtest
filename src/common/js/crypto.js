

import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse(
  '62@jk#egyz$nlobf'
)
const staticKey = CryptoJS.enc.Utf8.parse('62@jk#egyz$nlobf')
const sk = CryptoJS.enc.Utf8.parse('V!xtY*sU&w8%Mr^D')

function encryptF(w, k) {
  const srcs = CryptoJS.enc.Utf8.parse(w)
  const encrypted = CryptoJS.AES.encrypt(srcs, k, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

function decryptF(w, k) {
  const encryptedHexStr = CryptoJS.enc.Utf8.parse(w)
  const srcs = CryptoJS.enc.Utf8.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, k, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}

export const Encrypt = function (word, isStatic = false) {
  return encryptF(word, isStatic ? staticKey : key)
}

export const Decrypt = function (word) {
  return decryptF(word, key)
}

export const EnS = function (word) {
  return encryptF(word, sk)
}

export const DeS = function (word) {
  return decryptF(word, sk)
}

export const MD5 = function (word) {
    return CryptoJS.MD5(word).toString()
}
// Mode: ECB, Padding: Pkcs7
export const AESEncryptPassword = function (word) {
  const key = CryptoJS.enc.Utf8.parse('P!zsX*tV&u6%Ns^H')
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}