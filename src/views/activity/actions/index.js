import request from '@/utils/request'
export const getClassificationList = () => {
  return request('/api/productClassList', 'post')
}
