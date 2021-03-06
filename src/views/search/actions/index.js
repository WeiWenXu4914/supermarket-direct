import request from '@/utils/request'
// 图文搜索
export const searchArticle = (val) => {
    return request('/api/graphicSearch', 'post', { val: val })
}

// 企业搜索
export const phoneSearch = (val) => {
    return request('/api/phoneSearch', 'post', { val: val })
}

//商品搜索
export const searchInput = (val) => {
    return request('/api/productSearch?val=' + val,'get')
}

//搜索（我的关注，收藏，评论，点赞，转发）
export const myAllSearch =(val,type) => {
    return request('/api/myAllSearch','post',{ name: val, type: type })
}

//自提地址
export function SuperMarketList(val) {
    return request('/api/SuperMarketList', 'post', { detailed_site: val });
}

//自提地址
export function orderRanking() {
    return request('/api/orderRanking', 'post');
}

//自提地址
export function graphicRanking() {
    return request('/api/graphicRanking', 'post');
}

//自提地址
export function enterpriseRanking() {
    return request('/api/enterpriseRanking', 'post');
}
