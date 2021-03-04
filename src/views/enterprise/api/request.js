import request from '@/utils/request'


export const enterpriseDisClass = () => {
    return request('/api/enterpriseDisClass', 'post')
}

export const enterpriseClass = (query) => {
    return request('/api/enterpriseClass', 'post', query)
}