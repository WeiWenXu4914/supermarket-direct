import request from '@/utils/request';

// 获取文章详情
export const articleDetail = form => {
    return request('/api/HomeNavListRead', 'post', form)
}

// 获取文章评论列表
export const articleCommList = (form) => {
    return request('/api/memberCommentList', 'post', form)
}

// 文章评论
export const articleComm = (form) => {
    return request('/api/memberComment', 'post', form)
}

// 发布文章
export const articleCreate = (articleForm) => {
    return request('/api/HomeNavSave', 'post', articleForm)
}

// 发布默认文章
export const articleDefCreate = (articleForm) => {
    return request('/api/HomeDefNavSave', 'post', articleForm)
}

// 发布视频
export const publishVideo = (videoForm) => {
    return request('/api/HomeNavVideoSave', 'post', videoForm)
}

/**
 * 生活服务
 */
export const phoneList = (query) => {
    return request('/api/phoneList', 'post', query)
}

/**
 * 转发文章
 * @param {*} id 
 */
export const forwardArticles = (mem_forward_id, mem_forward_class) => {
    return request('/api/memberForward', 'post', { mem_forward_id, mem_forward_class })
}

/**
 * 转发记录
 * @param {*} id 
 */
export const memForward = (id) => {
    return request('/api/memberForwardList', 'post', { id })
}

/**
 * 上传音频
 * @param {*} file 
 */
export const uploadAudio = (file) => {
    return request('/api/RecUpload', 'post', file)
}

/**
 * 语言删除
 * @param {*} id 
 */
export const delAudio = (id) => {
    return request('/api/recDel', 'post', { grid: id } )
}

// 文章推荐
export const GraphicRecommend = (gid) => {
    return request('/api/GraphicRecommend?gid='+gid, 'get')
}

// 微信jssdk签名
export const wexinConfig = (val) => {
    return request('/api/wexinConfig', 'post', { url: val })
}

//文章收藏
export const memberCollect = (id, type, state) => {
    return request('/api/memberCollect', 'post', { mem_collect_id: id, mem_collect_class: type, state: state} )
}

/**
 * 点赞
 * @param {*} id 
 */
export const memberLike = (mem_like_id, mem_like_class, state) => {
    return request('/api/memberLike', 'post', { mem_like_id, mem_like_class, state })
}