import request from '@/utils/request'

/***
 * 我的钱包
*/
export const myWallet = () => {
    return request('/api/myWallet', 'get', )
}

/***
 * 我的转发详情
*/
export const forwardClick = (mfid) => {
    return request('/api/forwardClick', 'get', { id: mfid })
}