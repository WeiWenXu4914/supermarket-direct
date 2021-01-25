import request from '@/utils/request'

/**
 * 商品详情
 */
export const entProductDetail = (query) => {
    return request('/api/productList', 'post', query)
}

//获取商家地址
export const entAddress = (id) =>{
    return request('/api/EnterpriseSite?id=' + id, 'get')
}
//预约下单
export const bookingOrder = (one) => {
    return request('/api/AppointmentOrderAdd','post', one)
}

//我的预约订单
export const myReservation = (data) => {
    return request('/api/AppointmentOrderList','get')
}
//取消预约
export const cancel = (ent) => {
    return request('/api/AppointmentOrderOperate?id='+ ent.id + "&type=" + ent.type,'post', ent)
}
/**
 * 获取商品详情
 */
export const messageDetail = (id) => {
    return request('/api/productList', 'post', { proid: id })
}
/**
 * 订单信息添加
 */
export const pay = (data) => {
    return request('/api/orderAdd', 'post', data )
}

/**
 * 获取/删除/添加地址
 */
export const shippingAddress = (data) => {
    return request('/api/shippingAddress', 'post', data )
}

/**
 * 支付
 */
export const wxpay = (data) => {
    return request('/api/wxpay', 'post', data )
}
/**
 * 支付失败订单删除
 */
export const orderDel = (data) => {
    return request('/api/orderDel', 'post', {order_no: data} )
}
/**
 * 支付成功订单
 */
export const orderState = (data) => {
    return request('/api/orderState', 'post', {order_no: data} )
}
/**
 * 动态获取菜单
 */
export const DeliveryWay = () => {
    return request('/api/DeliveryWay', 'get' )
}

/**
 * 拼团详情
 */
export const groupBuyingDetails = (id) => {
    return request('/api/groupBuyingDetails?id='+id, 'get' )
}
// 开团参团
export const OpenJoinGroupBuying = (data) => {
    return request('/api/OpenJoinGroupBuying', 'post', data )
}
// 支付状态
export const editGroupBuying = (data) => {
    return request('/api/editGroupBuying', 'post', data )
}
//获取商家优惠券
export const productCoupon = (id) => {
    return request('/api/productCoupon?pro_id='+id, 'get' )
}
//获取商家优惠券
export const productCouponMem = (id) => {
    return request('/api/productCouponMem?pro_id='+id, 'get' )
}
//领取优惠券
export function DrawCoupon(couid) {
    return request('/api/discountCouponOperate', 'post', { 'couid': couid });
}
//商品收藏
export const memberCollect = (id, type, state) => {
    return request('/api/memberCollect', 'post', { mem_collect_id: id, mem_collect_class: type, state: state} )
}
//评论列表
export function memberCommentList(t,i) {
    return request('/api/memberCommentList', 'post', { type: t, id: i});
}
//评论列表
export function entSelfPickupSite(id) {
    return request('/api/entSelfPickupSite', 'get', { id});
}
//自提地址
export function searchSuperMarketList(obj) {
    return request('/api/searchSuperMarketList', 'get', obj);
}
