import request from '@/utils/request'

// 发布保姆月嫂
export const babySitter = (houseForm) => {
    return request('/api/HomeNavIntermediarySave', 'post', houseForm)
}

// 发布维修
export const mainTain = (houseForm) => {
    return request('/api/HomeNavIntermediarySave', 'post', houseForm)
}