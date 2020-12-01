import request from '@/utils/request'
// 登录
export const wxLogin = (url, callBackUrl) => {
    return request(url, 'post', { callBackUrl: callBackUrl })
}
// 登录
export const passLogin = (data) => {
    return request('api/passLogin', 'post', data)
}
// 修改密码
export const editPass = (data) => {
    return request('api/editPass', 'post', data)
}