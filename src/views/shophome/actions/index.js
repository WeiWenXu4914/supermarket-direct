import request from '@/utils/request';
/*我的优惠券*/
export const myDiscountCoupon = (id) => {
    return request('/api/myDiscountCoupon','get',{ couid: id })
}

/*活动规则*/
export const DrawRegulation =(id) => {
    return request('/api/DrawRegulation','get',{ entid: id })
}

/*我的奖品*/
export const myActivity =(entid) => {
    return request('/api/myActivity','get',{ id: entid })
}
/*我的奖品详情*/
export const myActivityDetail =(aprid) => {
    return request('/api/myActivityDetail','get',{ id: aprid })
}
/*优惠券领取*/
export const discountCouponOperate =(id) => {
    return request('/api/discountCouponOperate','post',{ couid: id })
}