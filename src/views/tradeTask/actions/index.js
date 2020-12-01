import request from '@/utils/request'
/**
 * 我的钱包
 */
export const myWallet = (val) => {
    return request('/api/myWallet', 'get', { token: val } )
}
/**
 * 任务列表
 */
export const taskList = () => {
    return request('/api/taskList', 'get')
}

//我的任务
export const psostask = (val) => {
    return request('/api/myTask?val='+val, 'get')
}

// 领取任务-任务详情
export const missionType = (val) => {
    return request('/api/TaskDetails', 'get', { id: val } )
}

// 我的任务-任务详情
export const myMissionType = (val) => {
    return request('/api/myTaskDetail', 'get', { id: val } )
}

// 我的任务-领取任务-设置
export const ClaimSettings = (data) => {
    return request('/api/TaskFor', 'post', data )
}

/**
 * 转发任务
 * 
 */
export const forwardArticles = (data) => {
    return request('/api/memberForward', 'post', data)
}