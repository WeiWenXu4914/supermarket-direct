import request from '@/utils/request';

/*
    协议
    1 注册协议, 2隐私协议 3关于我们 4 商家入驻规则
*/
export const LoginRegister =(val) => {
    return request('/api/LoginRegister','get',{ type: val })
}
