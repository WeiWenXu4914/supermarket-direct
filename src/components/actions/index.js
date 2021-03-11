import request from '@/utils/request';

// 微信jssdk签名
export const wexinConfig = (val) => {
    return request('/api/wexinConfig', 'post', { url: val })
}

export const inviterInfo = (val) => {
    return request('/api/inviterInfo', 'post', { res: val })
}

export const passInviter = (val) => {
    return request('/api/passInviter', 'post', { phone: val })
}