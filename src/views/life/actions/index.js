import request from '@/utils/request'

/**
 * 生活服务
 */
export const phoneList = (query) => {
    return request('/api/phoneList', 'post', query)
}