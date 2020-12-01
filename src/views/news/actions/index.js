import request from '@/utils/request'

/**
 * 获取消息
 */
export const messagePost = (data) => {
    return request('/api/messageCenter', 'post', data)
}

/**
 * 获取系统消息
 */
export const systemMessage = (data) => {
    return request('/api/systemMessage', 'post', data)
}

/**
 * 获取消息内容
 */
export const getMessages = (data) => {
    if(data == 'nav'){
        return request('/api/getMessageCenter?nav='+data, 'get')
    }
    return request('/api/getMessageCenter?val='+data, 'get')
}