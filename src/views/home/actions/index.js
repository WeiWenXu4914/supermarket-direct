import request from '@/utils/request'
// 获取首页数据
export const getHome = (data) => {
    return request('/api/HomeList?nid='+data.nid+'&size='+data.size+'&num='+data.num, 'get')
}
// 获取首页导航数据
export const getHomeNav = (type, id) => {
    return request('/api/HomeNav?type='+type+'&id='+id, 'get')
}
// 获取首页数据
export const getHomeList = (params) => {
    return request('/api/HomeNavList', 'post', {...params })
}

/**
 * 修改关注
 * @param {*} mem_id 
 * @param {*} state 
 */
export const changeFouce = (query) => {
    return request('/api/memberAttention', 'post', query)
}

/**
 * 转发文章
 * @param {*} id 
 */
export const forwardArticles = (mem_forward_id, mem_forward_class) => {
    return request('/api/memberForward', 'post', { mem_forward_id, mem_forward_class })
}

/**
 * 点赞
 * @param {*} id 
 */
export const memberLike = (mem_like_id, mem_like_class, state) => {
    return request('/api/memberLike', 'post', { mem_like_id, mem_like_class, state })
}

/**
 * 文章删除
 * @param {*} id 
 */
export const articleDel = (id) => {
    return request('/api/articleDel', 'post', { id })
}