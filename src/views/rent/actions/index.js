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