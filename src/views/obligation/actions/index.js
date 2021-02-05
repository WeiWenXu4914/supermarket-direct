import request from '@/utils/request'

/**
 * 获取订单详情
 */
export const messageDetail = (id) => {
    return request('/api/productList', 'post', { proid: id })
}
/**
 * 支付详情信息
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
 * 全部订单
 */
export const orderList = (obj) => {
    return request('/api/orderList', 'get',  obj )
}
/**
 * 删除订单
 */
export const delOrder = (id) => {
    return request('/api/delOrder', 'POST',  { order_number: id } )
}
/**
 * 取消订单
 */
export const cancelOrder = (id) => {
    return request('/api/cancelOrder', 'POST',  { order_number: id } )
}

/**
 * 支付成功订单
 */
export const orderState = (data) => {
    return request('/api/orderState', 'post', {order_no: data} )
}
/**
 * 订单搜索
 */
export const orderSearch = (text) => {
    return request('/api/orderSearch', 'get', { val: text } )
}

/**
 * 售后类型
 */
export const AfterSaleType = () => {
    return request('/api/AfterSaleType', 'get' )
}

/**
 * 售后服务
 */
export const afterSalesService = (obj) => {
    return request('/api/afterSalesService', 'post', obj )
}

/**
 * 用户全部售后服务结果
 */
export const myAfterSalesService = () => {
    return request('/api/myAfterSalesService', 'get' )
}
/**
 * 售后服务详情
 */
export const myAfterSalesServiceDetail = (idVal,typeVal) => {
    return request('/api/myAfterSalesServiceDetail', 'get', { id: idVal,type: typeVal })
}
/**
 * 协商历史 @param o_id
 */
export const negotiationHistory = (o_id) => {
    return request('/api/negotiationHistory', 'get', { id: o_id })
}
/**
 * 撤销申请
 */
export const withdrawApplication = (ora_id) => {
    return request('/api/withdrawApplication', 'get', { id: ora_id })
}
/**
 * 添加换货物流信息
 */
export const addAfterSalesServiceNumber = (ora_id,order) => {
    return request('/api/addAfterSalesServiceNumber', 'post', { id: ora_id,tracking: order })
}

/**
 * 打分描述
 */
export const GoodsComments = (obj) => {
    return request('/api/GoodsComments', 'post',  obj )
}
/**
 * 评分（打分）
 */
export const overMarkadd = (obj) => {
    return request('/api/overMarkadd', 'post',  obj )
}
/**
 * 确认收货
 */
export const confirmOrder = (val) => {
    return request(`/api/confirmOrder`, 'post',  { order_number: val } )
}

// 微信jssdk签名
export const wexinConfig = (val) => {
    return request('/api/wexinConfig', 'post', { url: val })
}

// 查看物流单号
export const getLogistic = (val) => {
    return request('/api/getLogistic', 'GET', { id: val })
}
//退款
export const orderRefund = (obj) => {
    return request('/api/orderRefund',"post", obj )
}
//退款详情
export const orderRefundInfo = (obj) => {
    return request('/api/orderRefundInfo',"post", obj )
}

//退款详情
export const sendDelivery = (number) => {
    return request('/api/sendDelivery',"post", { oid: number })
}

//查看物流
export const parcel = (number) => {
    return request('/api/parcel',"post", { number: number })
}
