// import Vue from 'vue'
// import Vuex from 'vuex'
// 按需导出全部导入
import * as auth from '@/utils/auth'
window.Vue.use(window.Vuex)

export default new window.Vuex.Store({
    state: {
        user: auth.getUser() || undefined, // vuex中设置user数据存储token
        isMerchants: auth.getMerchants() || undefined,
        merchantsId: auth.getMerchantsId() || undefined,
        userMapLoacl: undefined,
        commodityNum: 1, //商品购买数量
        commodityState: false, //商品页状态
        watchStoreTab: {//监听商家主页tab标签变化，使页面返回时可以到对应的tab标签
            path: '',
            active: 0
        }, 
    },
    mutations: {
        // 设置用户信息
        setUser(state, user) {
            state.user = user
            // 更新本地存储
            auth.setUser(user)
        },
        // 删除用户信息
        delUser(state) {
            state.user = {}
            auth.delUser()
        },
        // 修改用户信息
        upUser(state, val) {
            state.user[val.key] = val.val
            auth.upUser(val)
        },
        // 设置企业id
        setMerchantId(state, merchantsId) {
            state.merchantsId = merchantsId
            auth.setMerchantsId(merchantsId)
        },
        // 设置企业id
        setMerchant(state, isMerchants) {
            state.isMerchants = isMerchants
            auth.setMerchants(isMerchants)
        },
        // 设置定位
        setUserMap(state, local) {
            state.userMapLoacl = local
        },
        setStoreTab(state,val) {
            state.watchStoreTab = val;
        },
    },
    actions: {}
})