import request from '@/utils/request'
// 用户登录  手机号码
export const login = () => {
    return request('/api/userLogin', 'post', { username: '15147023638', password: '123456' })
}

// 上传图片
export const uploadImg = (file) => {
    return request('/api/ImgUpload', 'post', file)
}

// 上传图片base64格式
export const uploadBaseImg = (base) => {
    return request('/api/BaseImgUpload', 'post', base)
}

// 上传视频
export const uploadVideo = (file) => {
    return request('/api/VideoUpload', 'post', file)
}

// 上传链条
export const uploadChainPublish = (data) => {
    return request('/api/ChainPublish', 'post', data)
}

// 可选择性的上传
export const uploadSelective = (data) => {
    return request('/api/uploadSelective', 'post', data)
}

// 获取导航
export const getTabbat = (type) => {
    return request('/api/tabbar?type='+type, 'get')
}

// 发布列表
export const publishList = (data) => {
    return request('/api/publishList?val='+data, 'get')
}

// 获取是否有消息通知
export const getMessage = (data) => {
    return request('/api/messageCenter', 'post', data)
}

//腾讯地图接口
export function TencentArticl01(){
    return request('/api/myLocation', 'get')
}