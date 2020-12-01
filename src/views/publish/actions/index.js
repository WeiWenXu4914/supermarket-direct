import request from '@/utils/request'

// 发布招聘
export const publishJob = (jobForm) => {
    return request('/api/HomeNavEmploymentSave', 'post', jobForm)
}

// 发布租房
export const publishHouse = (houseForm) => {
    return request('/api/HomeNavIntermediarySave', 'post', houseForm)
}