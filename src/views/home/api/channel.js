import request from '@/utils/request.js'
export const myNav = (data) => {
  return request('api/myNav', 'post')
}
export const myNavDel = data => {
  return request('api/myNavDel', 'POST', data)
}
export const myNavAdd = data => {
  return request('api/myNavAdd', 'POST', data)
}
export const myNavSort = data => {
  return request('api/myNavSort', 'POST', data)
}