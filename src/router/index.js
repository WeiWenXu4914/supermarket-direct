import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
const Activity = () =>
    import ('@/views/activity')
const Mall = () =>
    import ('@/views/mall')
const ArticleCreate = () =>
    import ('@/views/article/create')
const ArticleVideoCreate = () =>
    import('@/views/article/createVideo')
const ArticleDefCreate = () =>
    import('@/views/article/createDef')
const Index = () =>
    import('../views/index/index')
const Agora = () =>
    import('@/views/bazaar/agora')

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            { 
                path: '/', 
                name: 'home', 
                component: Home, 
                meta: { 
                    iskeepAlive: true 
                } 
            },
            { 
                path: '/activity', 
                name: 'activity', 
                component: Activity, 
                meta: { 
                    iskeepAlive: true
                } 
            },
            {//商城产品列表
                path: '/productList',
                component: () => 
                    import('@/views/bazaar/productList'),
                meta: {
                    iskeepAlive: true
                }
            },
            {
                path: '/life',
                component: () => 
                    import('@/views/enterprise/index'),
                meta: {
                    iskeepAlive: true
                }
            },
        ]
    },
    {
        path: '/videoDetail/:id',
        name: 'videoDetail',
        component: () =>
            import('@/views/article/videoDetail')
    },
    // 文章详情
    {
        path: '/article/detail/:id',
        name: 'article-detail',
        component: () =>
            import('@/views/article/detail')
    },
    // 文章详情
    {
        path: '/article/full_screen_play/:id',
        name: 'article-full_screen_play',
        component: () =>
            import('@/views/article/full_screen_play')
    },
    { 
        path: '/article/create', 
        name: 'article-create', 
        component: ArticleCreate 
    },
    { 
        path: '/article/create', 
        name: 'index', 
        component: Index 
    },
    { 
        path: '/article/createvideo', 
        name: 'article-createvideo', 
        component: ArticleVideoCreate 
    },
    { 
        path: '/article/createdef', 
        name: 'article-createdef', 
        component: ArticleDefCreate 
    },
    // 用户信息
    {
        path: '/user',
        name: 'user',
        component: () =>
            import('@/views/user')
    },
    {
        path: '/bindingPhone',
        name: 'bindingPhone',
        component: () =>
            import('@/views/user/bindingPhone')
    },
    //商品详情页
    {
        path: '/detail',
        name: 'detail',
        component: () =>
            import('../views/detail/detail')
    },
    //商品详情页下单
    {
        path: '/pay',
        name: 'pay',
        component: () => 
            import('../views/detail/pay')
    },
    //商品支付页
    {
        path: '/commdityPay',
        name: 'commdityPay',
        component: () =>
            import('../views/detail/commdityPay')
    },
    {
        path: '/zz_payment',
        name: 'payment',
        component: () =>
            import('../views/detail/payment')
    },
    {
        path: '/goodsdetail',
        name: 'goodsdetail',
        component: () =>
            import('../views/detail/goodsdetail')
    },
    {
        path: '/zz_bank',
        name: 'bank',
        component: () =>
            import('../views/detail/bank')
    },
    {
        path: '/team',
        name: 'team',
        component: () =>
            import('../views/team/team')
    },
    {
        path: '/shophome',
        name: 'shophome',
        component: () =>
            import('../views/shophome/shophome')
    },
    {
        path: '/discount',
        name: 'discount',
        component: () =>
            import('../views/shophome/discount')
    },
    {
        path: '/history',
        name: 'history',
        component: () =>
            import('../views/shophome/history')
    },
    {
        path: '/discount-detail',
        name: 'discount-detail',
        component: () =>
            import('../views/shophome/discount-detail')
    },
    {
        path: '/award',
        name: 'award',
        component: () =>
            import('../views/shophome/award')
    },
    {
        path: '/prize',
        name: 'prize',
        component: () =>
            import('../views/shophome/prize')
    },
    {
        path: '/active-rule',
        name: 'active-rule',
        component: () =>
            import('../views/shophome/active-rule')
    },
    {
        path: '/shop',
        name: 'shop',
        component: () =>
            import('../views/shop/shop')
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () =>
            import('../views/shop/privacy')
    },
    {
        path: '/rule',
        name: 'rule',
        component: () =>
            import('../views/shop/rule')
    },
    {
        path: '/drafts',
        name: 'drafts',
        component: () =>
            import('../views/drafts/drafts')
    },
    //实名认证
    {
        path: '/Authentication',
        name: 'Authentication',
        component: () => 
            import('../views/user/Authentication')
    },
    {
        path: '/SubmittedSuccessfully',
        name: 'SubmittedSuccessfully',
        component: () => 
            import('../views/user/SubmittedSuccessfully')
    },
    {
        path: '/dra',
        name: 'dra',
        component: () =>
            import('../views/drafts/dra')
    },
    // zz_待付款
    {
        path: '/obligation',
        name: 'obligation',
        component: () =>
            import('../views/obligation/obligation')
    },
    {
        path: '/drop',
        name: 'drop',
        component: () =>
            import('../views/obligation/drop')
    },
    {
        path: '/wait',
        name: 'wait',
        component: () =>
            import('../views/obligation/wait')
    },
    {
        path: '/self',
        name: 'self',
        component: () =>
            import('../views/obligation/self')
    },
    {
        path: '/close',
        name: 'close',
        component: () =>
            import('../views/obligation/close')
    },
    {
        path: '/succed',
        name: 'succed',
        component: () =>
            import('../views/obligation/succed')
    },
    //zz_我的收货地址
    {
        path: '/add',
        name: 'add',
        component: () =>
            import('../views/obligation/add')
    },
    {
        path: '/myaddress',
        name: 'myaddress',
        component: () =>
            import('../views/obligation/myaddress')
    },
    {
        path: '/zz_comment',
        name: 'comment',
        component: () =>
            import('../views/obligation/comment')
    },
    {
        path: '/zz_issue',
        name: 'issue',
        component: () =>
            import('../views/my/issue')
    },
    {
        path: '/zz_collect',
        name: 'collect',
        component: () =>
            import('../views/my/collect')
    },
    {
        path: '/zz_store',
        name: 'store',
        component: () =>
            import('../views/my/store')
    },
    //zz_租房/卖房详情
    {
        path: '/zz_rentting',
        name: 'rentting',
        component: () =>
            import('../views/rent/rentting')
    },
    {
        path: '/zz_job',
        name: 'job',
        component: () =>
            import('../views/rent/job')
    },
    {
        path: '/zz_baby-sitter',
        name: 'baby-sitter',
        component: () =>
            import('../views/rent/baby-sitter')
    },
    {
        path: '/zz_article',
        name: 'article',
        component: () =>
            import('../views/rent/article')
    },
    {
        path: '/zz_particulars',
        name: 'particulars',
        component: () =>
            import('../views/rent/particulars')
    },
    {
        path: '/zz_pop-up',
        name: 'pop-up',
        component: () =>
            import('../views/rent/pop-up')
    },
    //zz_换货-驳回
    {
        path: '/zz_refund',
        name: 'refund',
        component: () =>
            import('../views/refund/refund')
    },
    {
        path: '/zz_return',
        name: 'return',
        component: () =>
            import('../views/refund/return')
    },
    {
        path: '/zz_refund_detail',
        name: 'detail',
        component: () =>
            import('../views/refund/refund_detail')
    },
    {
        path: '/zz_exchange',
        name: 'exchnage',
        component: () =>
            import('../views/refund/exchange')
    },
    {
        path: '/zz_exchangegoods',
        name: 'exchangegoods',
        component: () =>
            import('../views/refund/exchangegoods')
    },
    //zz_退款详情-仅退款
    {
        path: '/zz_only',
        name: 'only',
        component: () =>
            import('../views/refund/only')
    },
    {
        path: '/zz_consult',
        name: 'consult',
        component: () =>
            import('../views/refund/consult')
    },
    //zz_发布
    {
        path: '/zz_category',
        name: 'category',
        component: () =>
            import('../views/category/category')
    },
    {
        path: '/zz_sellers',
        name: 'sellers',
        component: () =>
            import('../views/category/sellers')
    },
    {
        path: '/zz_newcar',
        name: 'newcar',
        component: () =>
            import('../views/category/newcar')
    },
    {
        path: '/zz_write',
        name: 'write',
        component: () =>
            import('../views/category/write')
    },
    {
        path: '/zz_position',
        name: 'position',
        component: () =>
            import('../views/category/position')
    },
    {
        path: '/zz_maintain',
        name: 'maintain',
        component: () =>
            import('../views/category/maintain')
    },
    {
        path: '/zz_unlocking',
        name: 'unlocking',
        component: () =>
            import('../views/category/unlocking')
    },
    {
        path: '/zz_baby_sitter',
        name: 'baby_sitter',
        component: () =>
            import('../views/category/baby_sitter')
    },
    //zz_选择售后类型
    {
        path: '/zz_select',
        name: 'select',
        component: () =>
            import('../views/select/select')
    },
    {
        path: '/zz_apply',
        name: 'apply',
        component: () =>
            import('../views/select/apply')
    },
    {
        path: '/zz_huan',
        name: 'exchange',
        component: () =>
            import('../views/select/exchange')
    },
    {
        path: '/zz_type',
        name: 'type',
        component: () =>
            import('../views/select/type')
    },
    {
        path: '/zz_zong',
        name: 'zong',
        component: () =>
            import('../views/news/zong'),
    },
    {
        path: '/zz_inform',
        name: 'inform',
        component: () =>
            import('../views/news/inform')
    },
    {
        path: '/zz_collection',
        name: 'collection',
        component: () =>
            import('../views/news/collection')
    },
    // zz_全部订单
    {
        path: '/all',
        name: 'all',
        component: () =>
            import('../views/obligation/all')
    },
    {//订单详情
        path: '/orderDetail',
        name: 'orderDetail',
        component: () =>
            import('../views/obligation/orderDetail/index')
    },
    {//评价
        path: '/appraise',
        name: 'appraise',
        component: () => 
            import('@/views/obligation/appraise')
    },
    //售后模块
    {//售后类型选择
        path: '/chooseType',
        name: 'chooseType',
        component: () => 
            import('../views/obligation/afterSale/chooseType/chooseType')
    },
    {//售后类型(含三种售后形式)
        path: '/afterSale',
        name: 'afterSale',
        component: () => 
            import('../views/obligation/afterSale')
    },
    {//全部售后信息
        path: '/allAfterSale',
        name: 'allAfterSale',
        component: () => 
            import('../views/obligation/afterSale/allAfterSale')
    },
    {//换货失败
        path: '/exchangeReject',
        name: 'exchangeReject',
        component: () => 
            import('../views/obligation/afterSale/exchange/exchangeReject')
    },
    {//换货成功
        path: '/exchangeSuccess',
        name: 'exchangeReject',
        component: () => 
            import('../views/obligation/afterSale/exchange/exchangeSuccess')
    },
    {//退款
        path: '/afterSaleRefund',
        name: 'afterSaleRefund',
        component: () => 
            import('../views/obligation/afterSale/refund/afterSaleRefund')
    },
    {//退款退货
        path: '/afterSaleRefundReturn',
        name: 'afterSaleRefundReturn',
        component: () => 
            import('../views/obligation/afterSale/refund_return/afterSaleRefundReturn')
    },
    {//退款未处理
        path: '/afterSaleRefundOnly',
        name: 'afterSaleRefundOnly',
        component: () => 
            import('../views/obligation/afterSale/refund/afterSaleRefundOnly')
    },
    {//协商历史
        path: '/conmunicationHistory',
        name: 'conmunicationHistory',
        component: () => 
            import('../views/obligation/afterSale/conmunication_history/conmunicationHistory')
    },
    {
        path: '/order',
        name: 'order',
        component: () =>
            import('../views/obligation/order')
    },
    {
        path: '/goods-code',
        name: 'goods-code',
        component: () =>
            import('../views/obligation/goods-code')
    },
    {
        path: '/zz_fill',
        name: 'fill',
        component: () =>
            import('../views/obligation/fill')
    },
    {
        path: '/zz_take',
        name: 'take',
        component: () =>
            import('../views/obligation/take')
    },

    {
        path: '/set',
        name: 'set',
        component: () =>
            import('../views/shop/set')
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () =>
            import('../views/shop/agreement')
    },
    {
        path: '/user/page/:id',
        name: 'user-page',
        component: () =>
            import('@/views/user/homepage')
    },
    {
        path: '/user/fans',
        name: 'user-fans',
        component: () =>
            import('@/views/user/fans')
    },
    {
        path: '/user/concern',
        name: 'user-concern',
        component: () =>
            import('@/views/user/concern')
    },
    {
        path: '/user/introduce',
        name: 'user-introduce',
        component: () =>
            import('@/views/user/introduce')
    },
    {
        path: '/user/nameedit',
        name: 'user-nameedit',
        component: () =>
            import('@/views/user/nameedit')
    },
    // 我的钱包
    {
        path: '/myWallet',
        name: 'myWallet',
        component: () =>
            import('@/views/user/myManagement/myWallet')
    },
    // 我的拼团
    {
        path: '/user/myGroupBooking',
        name: 'user-group',
        component: () =>
            import('@/views/user/myGroupBooking')
    },
    // 我的团购
    {
        path: '/user/myGroupPurchase',
        name: 'user-group',
        component: () =>
            import('@/views/user/myGroupPurchase')
    },
    {
        path: '/user/message',
        name: 'user-message',
        component: () =>
            import('@/views/user/message')
    },
    {//我的评论
        path: '/myComments',
        name: 'myCommnets',
        component: () => 
            import("@/views/user/myManagement/myComments")
    },
    {//我的转发
        path: '/myForwarding',
        name: 'myForwarding',
        component: () => 
            import('@/views/user/myManagement/myForwarding')
    },
    {//我的转发详情
        path: '/myForwardDetail/:id',
        name: 'myForwardDetail',
        component: () => 
            import('@/views/user/myManagement/myForwardDetail')
    },
    {//我的点赞
        path: '/myLike',
        name: 'myLike',
        component: () => 
            import('@/views/user/myManagement/myLike')
    },
    {//商品全部评论
        path: '/commdityCommet',
        nmae: 'commdityCommet',
        component: () =>
            import('@/views/detail/commdityCommet')
    },
    // 商家
    {
        path: '/merchants',
        name: 'merchants',
        redirect: '/merchants/produce',
        component: () =>
            import('@/views/merchants/'),
            children: [
                // {
                //     path: '/merchants/home',
                //     name: 'home',
                //     meta: {
                //         isMerchant: true
                //     },
                //     component: () =>
                //         import('@/views/merchants/home')
                // },
                // 粉丝福利群
                {
                    path: '/merchants/fanswelfare',
                    name: 'fanswelfare',
                    meta: {
                        isMerchant: true
                    },
                    component: () =>
                        import('@/views/merchants/fanswelfare')
                },
                {
                    path: '/merchants/phonebookinfo',
                    name: 'phonebookinfo',
                    meta: {
                        isMerchant: true
                    },
                    component: () =>
                        import('@/views/merchants/phonebookinfo')
                },
                // 线上产品
                {
                    path: '/merchants/produce',
                    name: 'produce',
                    component: () =>
                        import('@/views/merchants/produce')
                },
                // 转盘
                {
                    path: '/merchants/luck',
                    name: 'luck',
                    component: () =>
                        import('@/views/merchants/luck')
                },
                // 优惠券
                {
                    path: '/merchants/discounts',
                    name: 'discounts',
                    component: () =>
                        import('@/views/merchants/discounts')
                },
                // 拼团
                {
                    path: '/merchants/groupBooking',
                    name: 'groupBooking',
                    component: () =>
                        import('@/views/merchants/groupBooking')
                },
                // 团购
                {
                    path: '/merchants/groupPurchase',
                    name: 'groupPurchase',
                    component: () =>
                        import('@/views/merchants/groupPurchase')
                },
                // 商品预约
                {
                    path: '/merchants/produceApp',
                    name: 'produceApp',
                    component: () =>
                        import('@/views/merchants/produceApp')
                },
                // 全部发布
                {
                    path: '/merchants/graphicAll',
                    name: 'graphicAll',
                    component: () =>
                        import('@/views/merchants/graphicAll')
                },
                // 文章发布
                {
                    path: '/merchants/graphicArticle',
                    name: 'graphicArticle',
                    component: () =>
                        import('@/views/merchants/graphicArticle')
                },
                // 中介发布
                {
                    path: '/merchants/graphicOther',
                    name: 'graphicOther',
                    component: () =>
                        import('@/views/merchants/graphicOther')
                }
            ]
    },
    // 预约成功
    {
        path: '/merchants/appointmented',
        name: 'appointmented',
        component: () =>
            import('@/views/merchants/appointmented')
    },
    // 企业
    {
        path: '/company/home/:id',
        name: 'company',
        component: () =>
            import ('@/views/company')
    },
    // 搜索
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/searchNew',
        name: 'searchNew',
        component: () =>
            import ('@/views/search/searchNew'),
        meta: { 
            iskeepAlive: true
        }
    },
    {
        path: '/search/result',
        name: 'search-result',
        component: () =>
            import ('@/views/search/result')
    },
    // 发布
    {
        path: '/publish',
        name: 'publish-select',
        component: () =>
            import ('@/views/publish')
    },
    {
        path: '/publish/job',
        name: 'publish-job',
        component: () =>
            import ('@/views/publish/job')
    },
    {
        path: '/publish/house',
        name: 'publish-house',
        component: () =>
            import ('@/views/publish/house')
    },
    {
        path: '/chain',
        name: 'chain',
        component: () =>
            import ('@/views/publish/chain')
    },
    {
        path: '/selective',
        name: 'selective',
        component: () =>
            import ('@/views/publish/selective')
    },
    // 会员卡
    {
        path: '/member/card',
        name: 'membership-card',
        component: () =>
            import ('@/views/member/membershipCard')
    },
    {
        path: '/member/join',
        name: 'join-members',
        component: () =>
            import ('@/views/member/joinMembers')
    },
    {
        path: '/member/roll',
        name: 'card-roll',
        component: () =>
            import ('@/views/member/cardRoll')
    },
    {
        path: '/member/shop',
        name: 'shop-member',
        component: () =>
            import ('@/views/member/shopMember')
    },

    // 登录注册
    {
        path: '/login',
        name: 'login',
        redirect: '/plogin',
        component: () =>
            import ('@/views/login'),
            children: [
                {
                    path: '/wlogin',
                    name: 'wlogin',
                    component: () =>
                        import ('@/views/login/wxlogin')
                },
                {
                    path: '/bindWechat',
                    name: 'bindWechat',
                    component: () =>
                        import ('@/views/login/bindWechat')
                },
                {
                    path: '/plogin',
                    name: 'plogin',
                    component: () =>
                        import ('@/views/login/plogin')
                },
                {
                    path: '/Register',
                    name: 'Register',
                    component: () =>
                        import ('@/views/login/Register')
                },
                {
                    path: '/passLogin',
                    name: 'passLogin',
                    component: () =>
                        import ('@/views/login/passLogin')
                },
                {
                    path: '/editPass',
                    name: 'editPass',
                    component: () =>
                        import ('@/views/login/editPass')
                }
            ]
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () =>
            import ('@/views/user/feedback')
    },
    //预约商品
    //预约
    {
        path: '/reservate',
        name: 'reservate',
        component: () =>
            import('@/views/detail/reservate')
    },
    //预约成功
    {
        path: '/appointment',
        name: 'appointment',
        component: () =>
            import('@/views/reservations/appointment')
    },
    //我的预约-记录
    {
        path: '/record',
        name: 'record',
        component: () =>
            import('@/views/reservations/record')
    },
    {
        path: '/recordDetail',
        name: 'recordDetail',
        component: () =>
            import('@/views/reservations/recordDetail')
    },
    //乐家市场  入口
    {
        path: '/entrance',
        name:  'entrance',
        component: () =>
            import('@/views/bazaar/entrance')
    },
    //申请加入乐家市场
    {
        path: '/join',
        name: 'join',
        component: () =>
            import('@/views/bazaar/join')
    },
    //选择商品
    {
        path: '/select',
        name: 'select',
        component: () =>
            import('@/views/bazaar/select')
    },
    //乐家市场商品
    {
        path: '/commodity',
        name: 'commodity',
        component: () =>
            import('@/views/bazaar/commodity')
    },
    //筛选
    {
        path: '/filtrate',
        name: 'filtrate',
        component: () =>
            import('@/views/bazaar/filtrate')
    },
    //乐家市场
    {
        path: '/agora',
        name: 'agora',
        component: () =>
            import('@/views/bazaar/agora')
    },
    {
        path: '/im',
        name: 'im',
        component: () =>
            import('@/views/im/views/group/GroupChat')
    },
    {//商家任务
        path: '/tradeTask',
        name: 'tradeTask',
        component: () =>
            import('@/views/tradeTask/tradeTask')
    },
    {//商家任务->我的任务
        path: '/myTradeTask',
        name: 'myTradeTask',
        component: () =>
            import('@/views/tradeTask/myTradeTask')
    },
    {//商家任务->钱包
        path: '/pwallentln',
        name: 'pwallentln',
        component: () =>
            import('@/views/tradeTask/pwalletIn')
    },
    {//商家任务->我的任务->任务详情
        path:'/taskrequest',
        name:'taskrequest',
        component:()=>
          import('@/views/tradeTask/taskrequest')
    },
    {//商家任务->领取任务->设置
        path:'/tupdate',
        name:'tupdate',
        component:()=>
          import('@/views/tradeTask/tupdate')
    },
    {//协议
        path: '/agreementAll',
        name: 'agreement',
        component: () => 
            import("@/views/agreement/agreement")
    },
    // 拼团详情
    {
        path: '/groupBookingDetail',
        name: 'groupBookingDetail',
        component: () => 
            import('@/views/detail/groupBookingDetail')
    },
    // 团购详情
    {
        path: '/groupPurchaseDetail',
        name: 'groupPurchaseDetail',
        component: () => 
            import('@/views/detail/groupPurchaseDetail')
    },
    // 城际特卖
    {
        path: '/inter_city_sale',
        name: 'inter_city_sale',
        component: () => 
            import('@/views/inter_city_sale')
    },
    //招商
    {
        path: '/inviteBusinessmen',
        name: 'inviteBusinessmen',
        component: () => 
            import('@/views/inter_city_sale/inviteBusinessmen')
    },
    {
        path: '/invitation/invitation_register',
        name: 'invitation_register',
        component: () => 
            import('@/views/invitation/invitation_register')
    },
    {//查看物流
        path: '/seeLogistics',
        component: () => 
            import('@/views/obligation/seeLogistics')
    }
]

const router = new VueRouter({
    routes
})

// 导航守卫拦截登录
router.beforeEach((to, from, next) => {
    next() // 默认放行
})
export default router