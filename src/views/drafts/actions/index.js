import request from '@/utils/request';
/**
 * 我的草稿列表
 */
export const myDraft = () => {
    return request('/api/myDraft', 'get' )
}

/**
 * 删除草稿
 */
export const myDraftDel = (id) => {
    return request('/api/myDraftDel', 'post', { gid: id } )
}