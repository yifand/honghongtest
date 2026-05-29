import requset from './request'
function login() {
  return requset({
    url: '/login',
    method: 'post'
  })
}