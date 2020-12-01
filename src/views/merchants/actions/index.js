import request from '@/utils/request';
// 企业信息
export const getEnterpriseHomepage = (id) => {
  return request('api/EnterpriseHome', 'post', { 'id': id });
};

/**
 * 修改关注
 * @param {*} mem_id
 * @param {*} state
 */
export const changeFouce = (query) => {
  return request('/api/memberAttention', 'post', query);
};

/**
 * 企业商列表
 * @param {*} entfid
 * @param {*} entid
 */
export const entProduct = (query) => {
  return request('/api/EnterpriseProduct', 'post', query);
};

export const entProductApp = (query) => {
  return request('/api/EnterpriseProductApp', 'post', query);
};

// 优惠券列表
export const CouponList = (entid) => {
  return request('/api/discountCoupon', 'post', { 'entid': entid });
};

//领取优惠券
export function DrawCoupon(couid) {
  return request('/api/discountCouponOperate', 'post', { 'couid': couid });
}

/**
 * 获取奖品列表
 * **/
export function RotaryDraw(id) {
  return request('/api/RotaryDraw', 'post', { entid: id });
}

//抽奖
export function startActivity(id) {
  return request('/api/startActivity', 'post', { id: id });
}

//拼团
export function groupBuyingList(id) {
  return request('/api/groupBuyingList?id='+id, 'get');
}

/**
 * 优惠大礼包(团购)
*/
export function GroupBuyList(id) {
  return request('/api/GroupBuyList', 'post', { entid: id });
}
