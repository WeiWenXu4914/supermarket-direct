import request from '@/utils/request'
// 我的会员卡
export const myCard = () => {
    return request('/api/myCard', 'post')
}

// 我的优惠券
export const myCoupon = () => {
    return request('/api/myCoupon', 'post')
}