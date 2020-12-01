import request from '@/utils/request'

/**
 * 获取我的发布
 */
export const getMyIssue = () => {
    return request('api/myIssue', 'post', {})
}

/**
 * 文章删除
 * @param {*} id
 */
export const articleDel = (id) => {
    return request('api/articleDel', 'post', { id })
}

/**
 * 关注的店铺
 */
export const getMyStore = () => {
    return request('api/myAttentionEnt', 'get', {})
}

/**
 * 取消关注
 */
export const cancelStore = (id,) => {
    return request('api/memberAttention', 'post', { id, state: 1})
}

//收藏夹接口
export function EnShrine() {
    return request('/api/myCollect', 'get', {})
}
//取消收藏
export function memberCollect(id,type) {
    return request('/api/memberCollect', 'POST', { mem_collect_id: id,mem_collect_class: type, state: 0 })
}