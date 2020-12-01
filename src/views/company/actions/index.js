import request from '@/utils/request'
// 企业介绍
export const getEnterpriseHomepage = (id) => {
    return request('api/EnterpriseHome', 'post', { 'id': id })
}