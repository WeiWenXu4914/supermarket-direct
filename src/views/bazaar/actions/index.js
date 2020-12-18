import request from '@/utils/request'
/**
 * 产品列表
 */
export const getLejiaProductList = (val) => {
  return request(`/api/LejiaProductListNew`, 'get', val)
}
/**
 * 生活服务
 */
export const phoneList = (query) => {
  return request('/api/phoneList', 'post', query)
}
