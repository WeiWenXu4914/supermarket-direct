<template>
    <div class="orderListWrapper">

        <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多订单了"
            @load="onLoad"
            immediate-check="false"
            ref="bottomCompoment"
            > -->
            <div class="zong" v-for="(item,index) in dataListItem" :key="index">
                <div class="content">
                    <div class="list" @click="intoStore(item.entid)">
                        <div class="icon">
                            <img :src="item.ent_logo" alt />
                        </div>
                        <p class="store-name">{{ item.ent_name }} <van-icon class="arrow-icon" name="arrow" /></p>
                        <p class="p2">{{ titleInfo(item.status) }}</p>
                        
                    </div>
                </div>
                <div class="wrapper" @click="toDetail(item)">
                    <div class="goods">
                        <img
                            :src="item.pro_thumbnail"
                            alt
                        />
                        <div class="center">
                            <p class="p1">{{ item.pro_name }}</p>
                            <p class="p2" v-if="item.dw_id == 3">包邮</p>
                            <p class="p2" v-else>到店自取</p>
                        </div>
                        <div class="right">
                            <p class="p1">￥</p>
                            <p class="p2">{{ item.pro_price }}</p>
                            <p class="p3">x{{ item.buy_num }}</p>
                        </div>
                    </div>
                    <span class="order-addtime">下单时间： {{ item.order_addtime }}</span>
                </div>
                <div class="last">
                    <p class="goods-number">共 {{ item.buy_num }} 件商品</p>
                    <div class="right">
                        <p class="p2">实付:</p>
                        <p class="p3">￥</p>
                        <p class="p4">{{ item.buy_pice }}</p>
                        <p class="p5">(免邮费)</p>
                    </div>
                </div>

                <!--上线使用-->
                <div class="allBtn" v-if="item.status == 0">
                    <button @click="dellOrder(item)" v-show="!isCancel">删除订单</button>
                    <button @click="cancelOrders(item)" v-show="isCancel">取消订单</button>
                    <button class="red" @click="toDetail(item)">立即支付</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 6" >
                    <button type="default" @click="dellOrder(item)">删除订单</button>
                    <button type="default" class="red" @click="toBuy(item)">进店购买</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 5" >
                    <button type="default" @click="dellOrder(item)">删除订单</button>
                    <button type="default" class="red" @click="toBuy(item)">进店购买</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 4" >
                    <button type="default" @click="dellOrder(item)">删除订单</button>
                    <button type="default" class="red" @click="toBuy(item)">进店购买</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 2 && item.dw_id == 3">
                    <button @click="toRefund(item)">申请退款</button>
                    <button @click="seeLogistics(item)">查看物流</button>
                    <button @click="confirmReceive(item,index)">确认收货</button>
                </div>
                <div class="allBtn"  v-else-if="item.status == 1 && item.dw_id == 3">
                    <button type="default" @click="toRefund(item)">申请退款</button>
                    <button type="default" class="red" @click="urgeSent(item)">提醒发货</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 1 && item.dw_id == 1">
                    <button type="default" @click="toRefund(item)">申请退款</button>
                    <button type="default" class="red" @click="toCode(item)">提货码</button>
                </div>
                <div class="allBtn" v-else-if="item.status == 3">
                    <!--目前交易成功订单无法删除-->
                    <!-- <van-button type="default" @click="dellOrder(item)">删除订单</van-button> -->
                    <!-- <button type="default" @click="toChooseType(item)">申请售后</button> -->
                    <button type="default" @click="toRefund(item)">申请退款</button>
                    <button type="default" @click="toBuy(item)">再次购买</button>
                    <button type="default" class="appraise" @click="appraise(item)" v-if="item.is_mark == 0">评价</button>
                </div>
            </div>
        <!-- </van-list> -->

        
        <van-empty description="无订单" class="state" v-if="dataListItem.length === 0 ? true : false" />
    </div>
</template>

<script>
import { orderList, delOrder, cancelOrder, confirmOrder, getLogistic, sendDelivery } from '../actions/index';
import { Icon,Toast,Empty,Dialog } from 'vant';
export default {
    props: ['state'],
    data() {
        return {
            dataListItem: [],
            isCancel: true,
            loading: false,
            finished: false,
            page: 1,
        }
    },
    watch: {
        state() {
            //处理组件tab切换无法下拉请求数据BUG
            this.getDate();
            // this.page = 1;
            // this.finished = false;
        }
    },
    beforeCreate() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
            overlay: true,
            duration: 0
        });
    },
    mounted() {
        this.getDate();
    },
    methods: {
        //查看物流
        async seeLogistics(item) {
            const data = JSON.stringify(item)
            this.$router.push({
                path:'/seeLogistics',
                query: {
                    data
                }
            })
            return;
            let number = null;
            
            await getLogistic(item.olog_id)
            .then((res) => {
                console.log(res)
                if(res.code == 100) {
                    number = res.data.logistics;

                    var textareaEl = document.createElement('textarea');
                    textareaEl.setAttribute('readonly', 'readonly');
                    textareaEl.value = number;
                    document.body.appendChild(textareaEl);
                    textareaEl.select();
                    document.execCommand('Copy');
                    document.body.removeChild(textareaEl);
                    console.log("复制成功");
                } else {
                    Toast(res.msg);
                    return;
                }
            })
            .catch(() => {
                Toast("请求出错");
                return;
            })

            Dialog.alert({
                title: `您的订单号为:${number}`,
                message: `\n您可以到对应快递公司进行查询\n已自动复制到您的粘贴板`,
                theme: 'round-button',
            }).then(() => {
            // on close
            });
        },
        //进店购买
        toBuy(val) {
            let obj = {
                proid: val.proid //商品id  
            };
            let shopKey = this.$Utils.demoRequest(JSON.stringify(obj));
            this.$router.push({
                path: '/commdityPay',
                query: {
                    res: shopKey
                }
            })
        },
        //提醒发货
        urgeSent(item) {
            sendDelivery(item.oid)
            .then((res) => {
                Toast(res.msg);
            })
            .catch((e) => {
                Toast("请求出错");
                console.log(e);
            })
        },
        getDate() {
            let obj = {
                num: 1,
                size: 1000
            }
            orderList(obj)
            .then((res) => {
                Toast.clear();

                this.loading = false;
                
               //分类数据                                          
                if( this.state === 0 ) {//已删除  is_del 1 是  0 否     待评价同理
                    this.dataListItem = res.data.filter( item => item.is_del != 1);
                } else if( this.state === 1) {//0 待付款；1待发货；2已发货；3已完成；4已关闭；5无效订单 6是过期 --->status
                    this.dataListItem = res.data.filter( item => item.status == 0 && item.is_del != 1);
                } else if( this.state === 2 ) {
                    this.dataListItem = res.data.filter( item => item.status == 1 && item.is_del != 1);
                } else if( this.state === 3 ) {
                    this.dataListItem = res.data.filter( item => item.status == 2 && item.is_del != 1);
                } else {
                    this.dataListItem = res.data.filter( item => item.is_mark == 0 && item.status == 3 && item.is_del != 1);
                }

                
                //用status = 1 来判断 收货码
            })
            .catch((err) => {
                console.log(err);
                Toast.fail('请求请求失败，请重试');
            })
        },
        intoStore(val) {

            let obj = {
                entid: val,
                entfid: 0
            };
            let res = this.$Utils.demoRequest(JSON.stringify(obj));

            this.$router.push({
                path: '/merchants/produce',
                query: {res: res}
            })
        },
        //状态
        titleInfo(val) {
            switch (val) {
                case 0:
                    return "待付款";
                    break;
                case 1:
                    return "待发货";
                    break;
                case 2:
                    return "已发货";
                    break;
                case 3:
                    return "已完成";
                    break;
                case 4:
                    return "交易关闭";
                    break;
                case 5:
                    return "无效订单";
                    break;
                case 6:
                    return "过期";
                    break;
                case 7:
                    return "退款中";
                    break;
                case 8:
                    return "退款成功";
                    break;
                case 9:
                    return "拒绝退款";
                    break;
            }
        },
        toDetail(val) {
            let data = JSON.stringify(val);
            if(val.status == 1 && val.dw_id == 1) {//提货页
                this.$router.push({
                    path: "/goods-code",
                    query: {
                        data
                    }
                });
            } else if(val.status == 7) {
                this.$router.push({
                    path: "/afterSaleRefundOnly",
                    query: {
                        order_number: val.order_number
                    }
                });
            } else if(val.status == 8 || val.status == 9) {
                this.$router.push({
                    path: "/afterSaleRefund",
                    query: {
                        state: val.status == 8 ? 2 : 3,
                        order_number: val.order_number
                    }
                })
            }else {
                this.$router.push({
                    path: '/orderDetail',
                    query: {
                        data
                    }
                });
            }
            
        },
        //提货页
        toCode(item) {
            let data = JSON.stringify(item);
            this.$router.push({
                path: "/goods-code",
                query: {
                    data
                }
            });
        },
        //售后类型选择
        toChooseType(val) {
            Toast("请您到线下店铺协调");
            return;
            let orderInfo = JSON.stringify(val)
            this.$router.push({
                path: '/chooseType',
                query: {
                    orderInfo
                }
            })
        },
        //退款
        toRefund(val) {
            let orderInfo = JSON.stringify(val)
            this.$router.push({
                path: '/afterSale',
                query: {
                    orderInfo,
                    type: '退款'
                }
            })
        },
        //取消订单
        cancelOrders(order) {
            Dialog.confirm({
                message: '确定要取消订单吗',
            })
            .then(() => {

            cancelOrder(order.order_number)
            .then((res) => {
                    if(res.code === 200) {
                        Toast("取消订单成功");
                        this.isCancel = false;
                    }
                })
                
            })
            .catch(() => {

            });
            
        },
        //删除订单
        dellOrder(order) {
            Dialog.confirm({
                message: '确定要删除订单吗',
            })
            .then(() => {
                // on confirm
                delOrder(order.order_number)
                .then((res) => {
                    if(res.code === 100) {
                        Toast("删除订单成功");
                        this.page = 1;
                        this.getDate();
                    }
                })
                
            })
            .catch(() => {
                // on cancel
            });
            
        },
        //立即支付
        pay(item) {
            let data = JSON.stringify(item);
            this.$router.push({
                path: '/orderDetail',
                query: {
                    data,
                    pay: 1
                }
            })
        },
        //评价
        appraise(val) {
            let data = JSON.stringify(val);
            this.$router.push({
                path: '/appraise',
                query: {
                    data
                }
            })
        },
        //确认收货
        confirmReceive(item) {
            confirmOrder(item.order_number)
            .then((res) => {
                if (res.code == 100) {
                    Toast("确认成功");
                    this.page = 1;
                    this.getDate();
                } else {
                    Toast(res.msg);
                }
            })
            .catch((err) => {
                Toast("请求出错");
            })
        },
        async onLoad() {//下划请求数据

            this.page ++;

            if(this.page > 2) {

                let obj = {
                    num: this.page - 1,
                    size: 5
                }
                
               await orderList(obj)
                .then((res) => {

                    this.loading = false;
                    if( this.state === 0 ) {//已删除  is_del 1 是  0 否     待评价同理
                        this.dataListItem.push(...(res.data.filter( item => item.is_del != 1)));
                    } else if( this.state === 1) {//0 待付款；1待发货；2已发货；3已完成；4已关闭；5无效订单 6是过期 --->status
                        this.dataListItem.push(...(res.data.filter( item => item.status == 0 && item.is_del != 1)))
                    } else if( this.state === 2 ) {
                        this.dataListItem.push(...(res.data.filter( item => item.status == 1 && item.is_del != 1)))
                    } else if( this.state === 3 ) {
                        this.dataListItem.push(...(res.data.filter( item => item.status == 2 && item.is_del != 1)));
                    } else {
                        this.dataListItem.push(...(res.data.filter( item => item.is_mark == 0 && item.status == 3 && item.is_del != 1)));
                    }
                    //如果没有数据，则停止组件触底事件
                    if(res.data.length === 0) {
                        this.finished = true;
                    }
                    if(res.data.length === 0 && this.dataListItem.length !== 0) {
                        // Toast("没有更多订单了");
                    }
                })
                .catch((e) => {
                    console.log(e)
                })

            }
            //延时关闭加载状态
            let timer = setTimeout(()=>{
                this.loading = false
                clearTimeout(timer)
            },1000);
            
        },
    }
}
</script>

<style lang="less">
    .orderListWrapper {
        .van-list__finished-text {
            display: none;
        }
        .state {
            background-color: #fff;
        }
        .zong:nth-last-of-type(1) {
            border: none;
        }
        .zong {
            background-color: #ffffff;
            padding-bottom: 0.2rem;
            border-bottom: 12px solid #F6F6F6;
            .content {
                .list {
                    display: flex;
                    width: 94%;
                    margin: 0 auto ;
                    padding-top: 0.5rem;
                    .icon {
                        display: flex;
                        border-radius: 0.1rem;
                        align-items: center;
                            img {
                                width: 30px;
                                height: 30px;
                                border-radius: 0.1rem;
                            }
                    }
                    .store-name {
                        position: relative;
                        color: #212121;
                        font-size: 13px;
                        padding-left: 7px;
                        line-height: 40px;
                        font-weight: bold;
                        /deep/.arrow-icon {
                            position: absolute;
                            color: #6D6D6D;
                            top: 50%;
                            right: -17px;
                            transform: translateY(-59%);
                        }
                    }
                    .p2 {
                        flex: 1;
                        text-align: right;
                        color: rgba(208, 68, 67, 1);
                        font-size: 14px;
                        line-height: 40px;
                        // margin: 0.15rem 0rem 0rem 3.5rem;
                    }
            }
        }
        .btn {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            button {
                margin-right: 10px;
            }
        }
        .wrapper {
            position: relative;
            border-bottom: 1px solid #eeecec;
            .goods {
                display: flex;
                width: 94%;
                margin: 10px auto 20px;
                img {
                    width: 78px;
                    height: 78px;
                    border-radius: 1px;
                }
        }
        .center {
            flex: 2;
            .p1 {
                font-size: 0.44rem;
                font-family: Source Han Sans CN;
                font-weight: 500;
                margin: 7px 0 0 7px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .p2 {
                display: inline-block;
                // width: 1rem;
                padding: 0 0.1rem;
                color: rgba(208, 68, 67, 1);
                border: 1px solid rgba(208, 68, 67, 1);
                text-align: center;
                border-radius: 0.1rem;
                margin: 0.6rem 0rem 0rem 0.2rem;
            }
        }
        .right {
            flex: 1;
            text-align: right;
            .p1 {
                margin-top: 5px;
                display: inline-block;
            }
            .p2 {
                margin-top: 5px;
                display: inline-block;
                font-size: 17px;
                color: #242424;
            }
            .p3 {
                color: #878787;
                font-size: 15px;
            }
        }
        .order-addtime {
            position: absolute;
            right: 4%;
            bottom: 24px;
            font-size: 12px;
            color: #ccc;
        }
    }
    .last {
        display: flex;
        width: 94%;
        margin: 0.3rem auto 0rem;
        p {
            display: inline-block;
        }
        .goods-number {
            display: inline-block;
        }
        .right {
            flex: 1;
            text-align: right;
            .p2 {
                color: #232323;
            }
            .p3 {
                font-size: 0.3rem;
                margin-top: 0.1rem;
                color: #db1043;
            }
            .p4 {
                font-size: 0.45rem;
                margin-top: -0.05rem;
                color: #db1043;
            }
            .p5 {
                margin-left: 0.1rem;
                margin-top: -0.05rem;
            }
        }
    }
    .allBtn {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        width: 94%;
        margin: 0 auto;
        button {
            margin: 13px 0rem 13px 0.4rem;
            outline: none;
            background-color: #ffffff;
            border: none;
            width: 70px;
            border: 1px solid #b0b0b0;
            height: 32px;
            font-size: 14px;
            color: #2a2a2a;
            font-family: Source Han Sans CN;
            border-radius: 0.05rem;
        }
        .red {
            background-color: #d04443;
            border: none;
            color: #fff;
        }
        .appraise {
            color: #D04443;
            border: 1px solid #D04443;
        }
    }
    
  }
}
</style>