import request from '@/utils/request'
// 绑定微信登录
export const wxLogin = () => {
    return request('api/wechatLogin', 'post')
}
// 登录
export const passLogin = (data) => {
    return request('api/passLogin', 'post', data)
}
// 修改密码
export const editPass = (data) => {
    return request('api/editPass', 'post', data)
}