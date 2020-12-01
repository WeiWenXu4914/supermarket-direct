import request from '@/utils/request'

//获取验证码
export const getCode = (params) => {
    return request('/api/AliSms', 'post', {...params})
}


//验证码登录
export const codeLogin = (params) => {
    return request('/api/codeLogin', 'post', {...params})
}

//验证码登录
export const bindingPhone = (params) => {
    return request('/api/bindingPhone', 'post', {...params})
}

//手机号验证
export const bindingPhoneVerif = (params) => {
    return request('/api/bindingPhoneVerif', 'post', {...params})
}