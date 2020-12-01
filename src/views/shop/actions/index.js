import request from '@/utils/request'
//商家入驻
export const checkinPost =(data) =>{
    return request('/api/phoneAdd','post',data)
}
//企业分类
export const getentClass =() =>{
    return request('/api/entClass','get')
}